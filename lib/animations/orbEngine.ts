/**
 * Geek Room — Hero Backdrop Engine
 *
 * Canvas 2D engine for the hero BACKDROP layers: the orbiting
 * particle cloud, the black-out scroll phase, and the interactive
 * spider webs. The hero's central object (the 3D Geek Room logo)
 * is rendered separately in Three.js — see components/sections/LogoScene.tsx.
 *
 * Interactive Spider Webs:
 * - Three asymmetric sheet-webs anchored across the viewport
 * - Uneven spokes, irregular ring spacing, per-strand sag and radius
 *   jitter, randomly broken strands — deliberately organic
 * - Touch & Hover Light-Up: Touching or hovering near any area of the
 *   web excites the strands in that vicinity with brilliant cyan-teal
 *   luminescence, soft aura, bright electric core, and glowing dewdrop nodes
 * - Graceful Decay: Once the pointer leaves or touch ends, the light
 *   fades away gracefully with smooth exponential decay (lingering phosphorescence)
 * - Tap / Click Shockwaves: Tapping or clicking sends an expanding ripple
 *   along the web strands
 * - Random strands breathe with graceful autonomous light (slow smooth swell,
 *   wide soft halo, traveling spark of light)
 *
 * Particles:
 * - Orbit around the logo's anchor with individual speeds/radii,
 *   twinkle and radius wobble; additive compositing
 * - Scroll scatter: particles fly to the screen corners as the logo
 *   recedes on scroll
 *
 * Engineering:
 * - Single <canvas>, device-pixel-ratio aware, token colors read from
 *   CSS custom properties (no hardcoded colors)
 * - Pauses when the tab is hidden; static single frame when reduced
 *   motion is preferred
 */

export interface OrbEngineHandle {
  destroy: () => void;
  /**
   * Scroll progress 0..1 (set by the hero's anime.js ScrollObserver).
   */
  setProgress: (value: number) => void;
}

interface Particle {
  baseR: number;
  angle: number;
  speed: number;
  size: number;
  alpha: number;
  twPhase: number;
  twSpeed: number;
  wobAmp: number;
  wobPhase: number;
  wobSpeed: number;
  white: boolean;
  /** Scatter target (scroll) — a screen corner with jitter */
  cX: number;
  cY: number;
}

/** Normalized web strand (unit = sheet radius; relative to sheet center) */
interface WebSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** quadratic control point (sag toward the center) */
  cx: number;
  cy: number;
  /** ring index for staggered reveal; -1 = radial spoke */
  ring: number;
  /** Current interactive excitation / glow intensity (0..1) */
  glow: number;
  /** Elapsed time of active glow pulse in seconds (-1 when idle) */
  glowTimer: number;
  /** Peak intensity attained by this pulse */
  peakIntensity: number;
  /** Whether the pointer is currently within proximity */
  inProximity: boolean;
  /** Pointer position when pulse was triggered */
  lastTrigX: number;
  lastTrigY: number;
}

interface WebSpoke {
  a: number;
  len: number;
  /** Current interactive excitation / glow intensity (0..1) */
  glow: number;
  /** Elapsed time of active glow pulse in seconds (-1 when idle) */
  glowTimer: number;
  /** Peak intensity attained by this pulse */
  peakIntensity: number;
  /** Whether the pointer is currently within proximity */
  inProximity: boolean;
  /** Pointer position when pulse was triggered */
  lastTrigX: number;
  lastTrigY: number;
}

/** One sheet web — anchored across the screen in one direction */
interface WebSheet {
  /** center as fractions of width / height */
  cxf: number;
  cyf: number;
  /** radius as a fraction of the spanning dimension */
  rf: number;
  /** true: spans left→right (radius relative to width) */
  horizontal: boolean;
  spokes: WebSpoke[];
  segs: WebSegment[];
  ringCount: number;
}

/** A strand chosen to breathe with graceful light */
interface StrandGlow {
  sheet: number;
  seg: number;
  speed: number;
  phase: number;
}

interface Rgb {
  r: number;
  g: number;
  b: number;
}

interface Ripple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  speed: number;
  life: number;
}

const TAU = Math.PI * 2;
/** Scroll progress where the screen starts going dull (as logo finishes exit) */
const DULL_START = 0.58;
/** Scroll progress where the webs start weaving in (after logo has exited) */
const WEB_START = 0.65;
/** How many strands breathe with graceful light */
const GLOW_STRANDS = 3;

function smooth(x: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return x * x * (3 - 2 * x);
}

function hexToRgb(hex: string): Rgb {
  const value = hex.replace("#", "").trim();
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value;
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return { r: 14, g: 176, b: 186 };
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function mixToWhite(c: Rgb, amount: number): Rgb {
  return {
    r: Math.round(c.r + (255 - c.r) * amount),
    g: Math.round(c.g + (255 - c.g) * amount),
    b: Math.round(c.b + (255 - c.b) * amount),
  };
}

function rgba(c: Rgb, a: number): string {
  return `rgba(${c.r},${c.g},${c.b},${a})`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Perpendicular distance from point P to line segment AB */
function distToSegment(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(px - ax, py - ay);
  let t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

export function createOrbEngine(canvas: HTMLCanvasElement): OrbEngineHandle {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { destroy: () => {}, setProgress: () => {} };

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Colors — read from design tokens, never hardcoded
  const styles = getComputedStyle(document.documentElement);
  const accent = hexToRgb(
    styles.getPropertyValue("--color-gr-accent").trim() || "#0eb0ba"
  );
  const white = hexToRgb(
    styles.getPropertyValue("--color-gr-white").trim() || "#fafafd"
  );
  const black = hexToRgb(
    styles.getPropertyValue("--color-gr-black").trim() || "#14151f"
  );
  const light = mixToWhite(accent, 0.72); // brilliant electric core color

  let width = 0;
  let height = 0;
  let radius = 100;
  let raf = 0;
  let playing = false;
  let inView = true;
  let t = 0;
  let last = 0;
  let progress = 0;
  let targetProgress = 0;

  let particles: Particle[] = [];
  let webs: WebSheet[] = [];
  let glows: StrandGlow[] = [];

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  // Pointer & Touch State
  const pointer = {
    x: -9999,
    y: -9999,
    active: false,
    isTouch: false,
  };

  // Expanding ripples from tap / click events
  const ripples: Ripple[] = [];

  function addRipple(x: number, y: number) {
    if (ripples.length > 6) ripples.shift();
    ripples.push({
      x,
      y,
      r: 12,
      maxR: Math.max(width, height) * 0.65,
      speed: 480,
      life: 1.0,
    });
  }

  // ------------------------------------------------------------
  // Build
  // ------------------------------------------------------------

  /**
   * Generates a clean, harmonious geometric sheet web.
   * Strands follow pure concentric catenary curves without overlapping jumble.
   */
  function makeSheet(
    cxf: number,
    cyf: number,
    rf: number,
    horizontal: boolean,
    startAngle: number,
    spanAngle: number,
    spokeCount: number,
    ringCount: number,
    closed: boolean = false
  ): WebSheet {
    // Pure harmonic angular distribution across the span
    const spokes: WebSpoke[] = [];
    const angleStep = closed
      ? spanAngle / spokeCount
      : spanAngle / (spokeCount - 1);

    for (let i = 0; i < spokeCount; i++) {
      const a = startAngle + i * angleStep;
      spokes.push({
        a,
        len: 0.96 + (i % 2 === 0 ? 0.04 : 0),
        glow: 0,
        glowTimer: -1,
        peakIntensity: 0,
        inProximity: false,
        lastTrigX: -9999,
        lastTrigY: -9999,
      });
    }

    // Progressive concentric geometric rings — smooth catenary sag without zig-zag collisions
    const segs: WebSegment[] = [];
    const segLimit = closed ? spokeCount : spokeCount - 1;

    for (let k = 0; k < ringCount; k++) {
      // Natural radial progression (spacing expands gently outward)
      const progress = (k + 1) / ringCount;
      const r = 0.16 + 0.84 * Math.pow(progress, 1.25);

      for (let i = 0; i < segLimit; i++) {
        const j = (i + 1) % spokeCount;
        const a1 = spokes[i].a;
        const a2 = spokes[j].a;
        const midA = a1 + (((a2 - a1 + TAU) % TAU) * 0.5);
        // Delicate 5.5% inward catenary sag
        const sag = 0.055;
        const midR = r * (1 - sag);

        segs.push({
          x1: Math.cos(a1) * r,
          y1: Math.sin(a1) * r,
          x2: Math.cos(a2) * r,
          y2: Math.sin(a2) * r,
          cx: Math.cos(midA) * midR,
          cy: Math.sin(midA) * midR,
          ring: k,
          glow: 0,
          glowTimer: -1,
          peakIntensity: 0,
          inProximity: false,
          lastTrigX: -9999,
          lastTrigY: -9999,
        });
      }
    }

    return { cxf, cyf, rf, horizontal, spokes, segs, ringCount };
  }

  /**
   * Generates two elegantly separated corner webs:
   * Upper-Right and Lower-Left.
   * Completely un-jumbled: they leave an open diagonal negative space
   * for the 3D logo and hero typography without colliding lines.
   */
  function initWebs() {
    webs = [
      // Web 1 — Upper-Right: sweeps down and left across the upper region
      makeSheet(
        0.88,
        0.12,
        0.52,
        true,
        0.45 * Math.PI,
        0.78 * Math.PI,
        8,
        6,
        false
      ),
      // Web 2 — Lower-Left: sweeps up and right across the lower region
      makeSheet(
        0.12,
        0.88,
        0.48,
        false,
        1.45 * Math.PI,
        0.78 * Math.PI,
        8,
        6,
        false
      ),
    ];

    // Autonomous graceful breathing strands (~8–20s cycles)
    glows = Array.from({ length: GLOW_STRANDS }, () => {
      const sheet = Math.floor(Math.random() * webs.length);
      const seg = Math.floor(Math.random() * webs[sheet].segs.length);
      return {
        sheet,
        seg,
        speed: 0.3 + Math.random() * 0.45,
        phase: Math.random() * TAU,
      };
    });
  }

  function build() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    if (width === 0 || height === 0) return;
    const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Particle orbit radius
    radius = clamp(Math.min(width, height) * 0.2, 90, 200);

    const count = Math.round(clamp((width * height) / 2800, 180, 650));
    particles = Array.from({ length: count }, (_, i) => {
      const baseR = radius * (1.18 + Math.pow(Math.random(), 1.6) * 3.1);
      const nearness = clamp(1 - (baseR - radius) / (radius * 3.2), 0, 1);
      const corner = i % 4;
      const cX =
        (corner % 2 === 0 ? -0.04 : 1.04) * width +
        (Math.random() - 0.5) * width * 0.08;
      const cY =
        (corner < 2 ? -0.06 : 1.06) * height +
        (Math.random() - 0.5) * height * 0.08;
      return {
        baseR,
        angle: Math.random() * TAU,
        speed: (0.04 + Math.random() * 0.22) * (Math.random() < 0.92 ? 1 : -1),
        size: 0.5 + Math.random() * 1.7,
        alpha: clamp(0.12 + nearness * 0.5 + Math.random() * 0.15, 0.05, 0.75),
        twPhase: Math.random() * TAU,
        twSpeed: 0.12 + Math.random() * 0.3,
        wobAmp: 3 + Math.random() * 10,
        wobPhase: Math.random() * TAU,
        wobSpeed: 0.3 + Math.random() * 0.6,
        white: Math.random() < 0.22,
        cX,
        cY,
      };
    });
  }

  // ------------------------------------------------------------
  // Interactive Excitation & Envelope Physics
  // ------------------------------------------------------------

  const PULSE_DURATION = 1.1; // Total duration in seconds: ~0.24s rise, ~0.86s decay
  const ATTACK_FRAC = 0.22; // Rise fraction (~0.24s)
  const DECAY_FRAC = 1 - ATTACK_FRAC; // Decay fraction (~0.86s)

  /**
   * Attack/decay pulse envelope:
   * First it glows up smoothly (sine quarter-wave),
   * then it gracefully dims down (cosine power decay) to zero.
   */
  function getPulseEnvelope(timer: number): number {
    if (timer < 0) return 0;
    const u = timer / PULSE_DURATION;
    if (u >= 1.0) return 0;

    if (u <= ATTACK_FRAC) {
      const r = u / ATTACK_FRAC;
      return Math.sin(r * Math.PI * 0.5);
    } else {
      const r = (u - ATTACK_FRAC) / DECAY_FRAC;
      const cosVal = Math.cos(r * Math.PI * 0.5);
      return cosVal * cosVal * Math.sqrt(cosVal);
    }
  }

  /**
   * Triggers a luminous pulse on a strand or spoke.
   * If already pulsing and cursor is actively moving, refreshes the pulse.
   */
  function triggerElement(
    target: WebSegment | WebSpoke,
    intensity: number,
    px: number,
    py: number
  ) {
    if (target.glowTimer >= 0 && target.glowTimer < PULSE_DURATION) {
      const moved =
        Math.hypot(px - target.lastTrigX, py - target.lastTrigY) > 22;
      if (moved && intensity > target.peakIntensity * 0.75) {
        target.glowTimer = 0;
        target.peakIntensity = Math.max(target.peakIntensity, intensity);
        target.lastTrigX = px;
        target.lastTrigY = py;
      } else if (intensity > target.peakIntensity) {
        target.peakIntensity = intensity;
      }
    } else {
      target.glowTimer = 0;
      target.peakIntensity = intensity;
      target.lastTrigX = px;
      target.lastTrigY = py;
    }
  }

  /**
   * Updates interactive touch/hover excitation across all strands.
   * Tight, focused radius ensures only the immediate strand touched illuminates,
   * without a huge broad glowing puddle.
   */
  function updateInteractiveEnergy(dt: number) {
    const POINTER_RADIUS = pointer.isTouch ? 64 : 48;
    const EXIT_RADIUS = POINTER_RADIUS * 1.35;

    // 1. Active pointer excitation field (hover or touch)
    if (pointer.active) {
      for (const sheet of webs) {
        const scale = (sheet.horizontal ? width : height) * sheet.rf;
        const cxp = sheet.cxf * width;
        const cyp = sheet.cyf * height;

        // Check ring strands
        for (const seg of sheet.segs) {
          const x1 = cxp + seg.x1 * scale;
          const y1 = cyp + seg.y1 * scale;
          const x2 = cxp + seg.x2 * scale;
          const y2 = cyp + seg.y2 * scale;
          const mx =
            cxp + (0.25 * seg.x1 + 0.5 * seg.cx + 0.25 * seg.x2) * scale;
          const my =
            cyp + (0.25 * seg.y1 + 0.5 * seg.cy + 0.25 * seg.y2) * scale;

          const d1 = distToSegment(pointer.x, pointer.y, x1, y1, mx, my);
          const d2 = distToSegment(pointer.x, pointer.y, mx, my, x2, y2);
          const d = Math.min(d1, d2);

          if (d < POINTER_RADIUS) {
            const prox = 1 - d / POINTER_RADIUS;
            const energy = prox * prox;

            if (!seg.inProximity) {
              seg.inProximity = true;
              triggerElement(seg, energy, pointer.x, pointer.y);
            } else {
              const moved =
                Math.hypot(pointer.x - seg.lastTrigX, pointer.y - seg.lastTrigY) > 22;
              if (moved) {
                triggerElement(seg, energy, pointer.x, pointer.y);
              }
            }
          } else if (d > EXIT_RADIUS) {
            seg.inProximity = false;
          }
        }

        // Check radial spokes
        for (const s of sheet.spokes) {
          const len = s.len * scale;
          const x2 = cxp + Math.cos(s.a) * len;
          const y2 = cyp + Math.sin(s.a) * len;
          const d = distToSegment(pointer.x, pointer.y, cxp, cyp, x2, y2);

          if (d < POINTER_RADIUS) {
            const prox = 1 - d / POINTER_RADIUS;
            const energy = prox * prox;

            if (!s.inProximity) {
              s.inProximity = true;
              triggerElement(s, energy, pointer.x, pointer.y);
            } else {
              const moved =
                Math.hypot(pointer.x - s.lastTrigX, pointer.y - s.lastTrigY) > 22;
              if (moved) {
                triggerElement(s, energy, pointer.x, pointer.y);
              }
            }
          } else if (d > EXIT_RADIUS) {
            s.inProximity = false;
          }
        }
      }
    } else {
      // Pointer left the canvas or touch ended: reset inProximity
      for (const sheet of webs) {
        for (const seg of sheet.segs) {
          seg.inProximity = false;
        }
        for (const s of sheet.spokes) {
          s.inProximity = false;
        }
      }
    }

    // 2. Expanding touch/click shockwave ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rip = ripples[i];
      rip.r += dt * rip.speed;
      rip.life -= dt * 1.05;

      if (rip.life <= 0.01 || rip.r > rip.maxR) {
        ripples.splice(i, 1);
        continue;
      }

      const ringThickness = 24;
      for (const sheet of webs) {
        const scale = (sheet.horizontal ? width : height) * sheet.rf;
        const cxp = sheet.cxf * width;
        const cyp = sheet.cyf * height;

        for (const seg of sheet.segs) {
          const mx =
            cxp + (0.25 * seg.x1 + 0.5 * seg.cx + 0.25 * seg.x2) * scale;
          const my =
            cyp + (0.25 * seg.y1 + 0.5 * seg.cy + 0.25 * seg.y2) * scale;
          const d = Math.hypot(mx - rip.x, my - rip.y);
          const ringDist = Math.abs(d - rip.r);

          if (ringDist < ringThickness) {
            const excitation =
              (1 - ringDist / ringThickness) * rip.life * 0.95;
            if (excitation > 0.15) {
              triggerElement(seg, excitation, rip.x, rip.y);
            }
          }
        }

        for (const s of sheet.spokes) {
          const len = s.len * scale;
          const mx = cxp + Math.cos(s.a) * (len * 0.5);
          const my = cyp + Math.sin(s.a) * (len * 0.5);
          const d = Math.hypot(mx - rip.x, my - rip.y);
          const ringDist = Math.abs(d - rip.r);

          if (ringDist < ringThickness) {
            const excitation =
              (1 - ringDist / ringThickness) * rip.life * 0.85;
            if (excitation > 0.15) {
              triggerElement(s, excitation, rip.x, rip.y);
            }
          }
        }
      }
    }

    // 3. Advance pulse envelopes and compute current glow values
    for (const sheet of webs) {
      for (const seg of sheet.segs) {
        if (seg.glowTimer >= 0) {
          seg.glowTimer += dt;
          if (seg.glowTimer >= PULSE_DURATION) {
            seg.glowTimer = -1;
            seg.glow = 0;
            seg.peakIntensity = 0;
          } else {
            seg.glow = seg.peakIntensity * getPulseEnvelope(seg.glowTimer);
          }
        } else {
          seg.glow = 0;
        }
      }

      for (const s of sheet.spokes) {
        if (s.glowTimer >= 0) {
          s.glowTimer += dt;
          if (s.glowTimer >= PULSE_DURATION) {
            s.glowTimer = -1;
            s.glow = 0;
            s.peakIntensity = 0;
          } else {
            s.glow = s.peakIntensity * getPulseEnvelope(s.glowTimer);
          }
        } else {
          s.glow = 0;
        }
      }
    }
  }

  // ------------------------------------------------------------
  // Drawing
  // ------------------------------------------------------------

  /**
   * The multiple sheet-webs.
   * Only appears AFTER the user scrolls past the Geek Room 3D logo (revealBase > 0).
   * While the Geek Room logo is on screen (revealBase <= 0), no web is drawn.
   */
  function drawWeb(time: number, dt: number, revealBase: number) {
    if (revealBase <= 0.001) {
      return;
    }
    updateInteractiveEnergy(dt);

    const effectiveBase = revealBase;

    for (let wi = 0; wi < webs.length; wi++) {
      const sheet = webs[wi];
      const reveal = clamp(
        (effectiveBase - wi * 0.15) / (1 - wi * 0.15),
        0,
        1
      );

      const scale = (sheet.horizontal ? width : height) * sheet.rf;
      const cxp = sheet.cxf * width;
      const cyp = sheet.cyf * height;

      // Base breathing wave
      const base = 0.5 * (0.93 + 0.07 * Math.sin(time * 0.4 + wi));

      // --------------------------------------------------------
      // 1. BASE PASS: Subtle resting web strands
      // --------------------------------------------------------
      const spokeReveal = clamp(reveal * 1.5, 0, 1);
      ctx!.lineWidth = 0.75;

      for (const s of sheet.spokes) {
        const len = s.len * scale * spokeReveal;
        ctx!.beginPath();
        ctx!.moveTo(cxp, cyp);
        ctx!.lineTo(cxp + Math.cos(s.a) * len, cyp + Math.sin(s.a) * len);
        ctx!.strokeStyle = rgba(accent, 0.1 * base);
        ctx!.stroke();
      }

      for (const seg of sheet.segs) {
        const segReveal = Math.max(
          clamp(reveal * (sheet.ringCount + 2) - seg.ring, 0, 1),
          seg.glow
        );
        if (segReveal <= 0) continue;

        ctx!.beginPath();
        ctx!.moveTo(cxp + seg.x1 * scale, cyp + seg.y1 * scale);
        ctx!.quadraticCurveTo(
          cxp + seg.cx * scale,
          cyp + seg.cy * scale,
          cxp + seg.x2 * scale,
          cyp + seg.y2 * scale
        );
        ctx!.strokeStyle = rgba(accent, 0.08 * base * segReveal);
        ctx!.stroke();
      }

      // --------------------------------------------------------
      // 2. INTERACTIVE LIGHT-UP PASS: Excited strands and spokes
      // --------------------------------------------------------
      ctx!.globalCompositeOperation = "lighter";

      // Glowing spokes
      for (const s of sheet.spokes) {
        if (s.glow < 0.015) continue;
        const len = s.len * scale;
        const x2 = cxp + Math.cos(s.a) * len;
        const y2 = cyp + Math.sin(s.a) * len;

        // Tight outer aura
        ctx!.beginPath();
        ctx!.moveTo(cxp, cyp);
        ctx!.lineTo(x2, y2);
        ctx!.strokeStyle = rgba(accent, 0.3 * s.glow);
        ctx!.lineWidth = 1.4 + 1.8 * s.glow;
        ctx!.stroke();

        // Crisp electric core
        ctx!.beginPath();
        ctx!.moveTo(cxp, cyp);
        ctx!.lineTo(x2, y2);
        ctx!.strokeStyle = rgba(light, 0.85 * s.glow);
        ctx!.lineWidth = 0.8 + 0.5 * s.glow;
        ctx!.stroke();
      }

      // Glowing ring strands
      for (const seg of sheet.segs) {
        if (seg.glow < 0.015) continue;

        const x1 = cxp + seg.x1 * scale;
        const y1 = cyp + seg.y1 * scale;
        const x2 = cxp + seg.x2 * scale;
        const y2 = cyp + seg.y2 * scale;
        const qx = cxp + seg.cx * scale;
        const qy = cyp + seg.cy * scale;

        // Tight refined luminous halo (surface area kept minimal)
        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        ctx!.quadraticCurveTo(qx, qy, x2, y2);
        ctx!.strokeStyle = rgba(accent, 0.35 * seg.glow);
        ctx!.lineWidth = 1.8 + 2.2 * seg.glow;
        ctx!.stroke();

        // Sharp filament core
        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        ctx!.quadraticCurveTo(qx, qy, x2, y2);
        ctx!.strokeStyle = rgba(light, 0.95 * seg.glow);
        ctx!.lineWidth = 0.9 + 0.6 * seg.glow;
        ctx!.stroke();

        // Micro-dewdrop node highlights at strand vertices (clean pinpoints)
        if (seg.glow > 0.35) {
          const nodeR = 0.9 + 1.1 * seg.glow;
          ctx!.fillStyle = rgba(light, 0.8 * seg.glow);

          ctx!.beginPath();
          ctx!.arc(x1, y1, nodeR, 0, TAU);
          ctx!.fill();

          ctx!.beginPath();
          ctx!.arc(x2, y2, nodeR, 0, TAU);
          ctx!.fill();
        }
      }

      ctx!.globalCompositeOperation = "source-over";
    }

    // ----------------------------------------------------------
    // 3. Autonomous graceful breathing glows
    // ----------------------------------------------------------
    const glowAmp = 0.3 + 0.7 * effectiveBase;
    ctx!.globalCompositeOperation = "lighter";
    for (const glow of glows) {
      const sheet = webs[glow.sheet];
      const seg = sheet?.segs[glow.seg];
      if (!seg) continue;

      const wave = 0.5 + 0.5 * Math.sin(time * glow.speed + glow.phase);
      const b = smooth(wave) * 0.85 * glowAmp;
      if (b < 0.015) continue;

      const scale = (sheet.horizontal ? width : height) * sheet.rf;
      const cxp = sheet.cxf * width;
      const cyp = sheet.cyf * height;
      const x1 = cxp + seg.x1 * scale;
      const y1 = cyp + seg.y1 * scale;
      const x2 = cxp + seg.x2 * scale;
      const y2 = cyp + seg.y2 * scale;
      const qx = cxp + seg.cx * scale;
      const qy = cyp + seg.cy * scale;

      // Soft halo
      ctx!.beginPath();
      ctx!.moveTo(x1, y1);
      ctx!.quadraticCurveTo(qx, qy, x2, y2);
      ctx!.strokeStyle = rgba(light, 0.08 * b);
      ctx!.lineWidth = 2.4;
      ctx!.stroke();

      // Core
      ctx!.beginPath();
      ctx!.moveTo(x1, y1);
      ctx!.quadraticCurveTo(qx, qy, x2, y2);
      ctx!.strokeStyle = rgba(light, 0.35 * b);
      ctx!.lineWidth = 1;
      ctx!.stroke();

      // Traveling point of light
      const u = b;
      const px =
        (1 - u) * (1 - u) * x1 + 2 * (1 - u) * u * qx + u * u * x2;
      const py =
        (1 - u) * (1 - u) * y1 + 2 * (1 - u) * u * qy + u * u * y2;
      const dotR = scale * 0.045;
      const dot = ctx!.createRadialGradient(px, py, 0, px, py, dotR);
      dot.addColorStop(0, rgba(light, 0.28 * b));
      dot.addColorStop(0.4, rgba(light, 0.1 * b));
      dot.addColorStop(1, rgba(light, 0));
      ctx!.fillStyle = dot;
      ctx!.beginPath();
      ctx!.arc(px, py, dotR, 0, TAU);
      ctx!.fill();
    }
    ctx!.globalCompositeOperation = "source-over";
  }

  function drawParticles(cx: number, cy: number, time: number, dt: number) {
    ctx!.globalCompositeOperation = "lighter";
    const scatter = Math.pow(progress, 1.4);
    for (const p of particles) {
      p.angle += p.speed * dt;
      const rr = p.baseR + Math.sin(time * p.wobSpeed + p.wobPhase) * p.wobAmp;
      const orbitX = cx + Math.cos(p.angle) * rr + mouse.x * rr * 0.08;
      const orbitY = cy + Math.sin(p.angle) * rr * 0.92 + mouse.y * rr * 0.08;
      const x = orbitX + (p.cX - orbitX) * scatter;
      const y = orbitY + (p.cY - orbitY) * scatter;
      const twinkle = 0.72 + 0.28 * Math.sin(time * p.twSpeed + p.twPhase);
      const a = clamp(p.alpha * twinkle * (1 - scatter * 0.55), 0, 0.85);
      ctx!.fillStyle = p.white ? rgba(white, a * 0.6) : rgba(accent, a);
      ctx!.beginPath();
      ctx!.arc(x, y, p.size * (1 - scatter * 0.35), 0, TAU);
      ctx!.fill();
    }
    ctx!.globalCompositeOperation = "source-over";
  }

  function draw(time: number, dt: number) {
    ctx!.clearRect(0, 0, width, height);

    progress += (targetProgress - progress) * 0.1;

    const dull = smooth((progress - DULL_START) / (1 - DULL_START));
    const webP = smooth((progress - WEB_START) / (1 - WEB_START));

    const drift = 1 - progress * 0.8;
    const cx =
      width / 2 +
      Math.sin(time * 0.13) * 18 * drift +
      Math.cos(time * 0.07) * 10 * drift +
      mouse.x * 30;
    const cy =
      height * 0.44 +
      Math.cos(time * 0.17) * 14 * drift +
      Math.sin(time * 0.09) * 8 * drift +
      mouse.y * 26;

    // 1. Sink to near-black once the logo has covered the screen
    if (dull > 0) {
      ctx!.fillStyle = rgba(black, dull * 0.92);
      ctx!.fillRect(0, 0, width, height);
    }

    // 2. Particles — orbiting, then scattered to the corners
    drawParticles(cx, cy, time, dt);

    // 3. The sheet webs with interactive touch/hover illumination and graceful decay
    drawWeb(time, dt, webP);
  }

  // ------------------------------------------------------------
  // Loop control
  // ------------------------------------------------------------

  function loop(now: number) {
    raf = 0;
    if (reduced || !inView || document.hidden) {
      playing = false;
      return;
    }
    const dt = clamp((now - last) / 1000, 0.001, 0.05);
    last = now;
    t += dt;
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    draw(t, dt);
    raf = requestAnimationFrame(loop);
  }

  function play() {
    if (playing || reduced) return;
    playing = true;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  }

  function pause() {
    playing = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  // ------------------------------------------------------------
  // Event Listeners (Pointer, Hover, Touch, Resize)
  // ------------------------------------------------------------

  const onPointerMove = (event: PointerEvent) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
    pointer.isTouch = event.pointerType === "touch";

    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      mouse.tx = clamp((event.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5);
      mouse.ty = clamp((event.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5);
    }
  };

  const onPointerDown = (event: PointerEvent) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
    pointer.isTouch = event.pointerType === "touch";
    addRipple(event.clientX, event.clientY);
  };

  const onPointerUp = () => {
    pointer.active = false;
  };

  const onTouchMove = (event: TouchEvent) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      pointer.x = touch.clientX;
      pointer.y = touch.clientY;
      pointer.active = true;
      pointer.isTouch = true;
    }
  };

  const onTouchStart = (event: TouchEvent) => {
    for (let i = 0; i < event.touches.length; i++) {
      const touch = event.touches[i];
      pointer.x = touch.clientX;
      pointer.y = touch.clientY;
      pointer.active = true;
      pointer.isTouch = true;
      addRipple(touch.clientX, touch.clientY);
    }
  };

  const onTouchEnd = () => {
    pointer.active = false;
  };

  const onPointerLeave = () => {
    pointer.active = false;
  };

  const onVisibility = () => {
    if (document.hidden) pause();
    else if (inView) play();
  };

  const observer =
    typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver((entries) => {
          inView = entries.some((entry) => entry.isIntersecting);
          if (inView) play();
          else pause();
        })
      : null;

  const resizeObserver =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => {
          build();
          if (reduced) draw(t, 0);
        })
      : null;

  initWebs();
  build();

  if (reduced) {
    draw(0, 0); // single static frame
  } else {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    document.addEventListener("visibilitychange", onVisibility);
    observer?.observe(canvas);
    resizeObserver?.observe(canvas);
    play();
  }

  return {
    destroy: () => {
      pause();
      observer?.disconnect();
      resizeObserver?.disconnect();

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointerleave", onPointerLeave);

      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);

      document.removeEventListener("visibilitychange", onVisibility);
    },
    setProgress: (value: number) => {
      targetProgress = clamp(value, 0, 1);
    },
  };
}
