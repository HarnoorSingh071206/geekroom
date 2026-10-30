"use client";

/**
 * Geek Room — Striker GR-7 (Official Society Mascot)
 *
 * An original, futuristic bipedal athletic android companion for Geek Room.
 * Wears the official Geek Room Football Jersey (#7, "GEEKROOM" on back).
 *
 * Key Behaviors:
 * 1. Orthographic Projection: Zero perspective distortion. The mascot maintains
 *    100% consistent width, size, and proportions across the entire screen
 *    (no corner widening, no middle slimming).
 * 2. Proper Screen Bounds & Headroom: Scaled down gracefully (0.72x) with generous
 *    vertical clearance so jumps, flips, and celebration leaps never clip.
 * 3. Directional Awareness & User Eye-Contact:
 *    - When scrolling down (moving left-to-right): Turns and walks forward towards
 *      the right, facing the direction of travel and kicking the ball ahead.
 *    - When scrolling up (moving right-to-left): Turns and walks forward towards
 *      the left, facing the direction of travel and kicking the ball ahead.
 *    - When stopped at rest anywhere on the page: Smoothly turns to directly face
 *      the user/camera with friendly eye contact!
 * 4. Uncaged & Integrated: Floating freely across the screen bottom without cage or box.
 * 5. Direct Robot Touch/Click: Clicking directly on the mascot launches tricks.
 * 6. Signature Tricks:
 *    - "suii": Cristiano Ronaldo's iconic celebration: twirls finger in circle in
 *      the air, leaps high with a 180° mid-air spin, lands emphatically in the
 *      power stance facing away from the camera where "GEEKROOM" and "#7" are
 *      proudly displayed, shouting "SIUUUUUUUU! 💥 #7", then turns back to user.
 *    - "somersault", "jump", "fall", "say_hi".
 */

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { prefersReducedMotion } from "@/lib/animations/anime";

type TrickType = "idle" | "suii" | "somersault" | "jump" | "fall" | "say_hi";

// ============================================================================
// PROCEDURAL CANVAS TEXTURE GENERATORS
// ============================================================================

function makeJerseyFrontTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // Deep navy athletic fabric
    ctx.fillStyle = "#121420";
    ctx.fillRect(0, 0, 512, 512);

    // Micro mesh texture
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    for (let x = 0; x < 512; x += 8) {
      for (let y = 0; y < 512; y += 8) {
        ctx.fillRect(x, y, 4, 4);
      }
    }

    // Athletic V-neck collar
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(170, 0);
    ctx.lineTo(256, 100);
    ctx.lineTo(342, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#0eb0ba";
    ctx.beginPath();
    ctx.moveTo(188, 0);
    ctx.lineTo(256, 82);
    ctx.lineTo(324, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#121420";
    ctx.beginPath();
    ctx.moveTo(206, 0);
    ctx.lineTo(256, 62);
    ctx.lineTo(306, 0);
    ctx.closePath();
    ctx.fill();

    // Dual athletic speed stripes down center
    ctx.fillStyle = "#0eb0ba";
    ctx.fillRect(234, 130, 18, 382);
    ctx.fillStyle = "#ff5a1f";
    ctx.fillRect(260, 130, 18, 382);

    // Diagonal side chevrons
    ctx.fillStyle = "rgba(14, 176, 186, 0.25)";
    ctx.beginPath();
    ctx.moveTo(0, 220);
    ctx.lineTo(130, 350);
    ctx.lineTo(130, 400);
    ctx.lineTo(0, 270);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 90, 31, 0.25)";
    ctx.beginPath();
    ctx.moveTo(512, 220);
    ctx.lineTo(382, 350);
    ctx.lineTo(382, 400);
    ctx.lineTo(512, 270);
    ctx.fill();

    // Geek Room Shield Crest (Left chest)
    ctx.save();
    ctx.translate(135, 175);
    ctx.fillStyle = "#181a28";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, -36);
    ctx.lineTo(36, -36);
    ctx.quadraticCurveTo(42, 10, 0, 48);
    ctx.quadraticCurveTo(-42, 10, -36, -36);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Crest letters <GR/>
    ctx.font = "900 24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#0eb0ba";
    ctx.fillText("<", -18, 2);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("GR", 1, 2);
    ctx.fillStyle = "#ff5a1f";
    ctx.fillText(">", 20, 2);
    ctx.restore();

    // "GEEK ROOM" Sponsor logo across chest
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 32px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("GEEK ROOM", 256, 305);

    ctx.fillStyle = "#0eb0ba";
    ctx.font = "700 13px monospace";
    ctx.fillText("OFFICIAL ATHLETIC KIT", 256, 332);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeJerseyBackTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // Deep navy athletic fabric
    ctx.fillStyle = "#121420";
    ctx.fillRect(0, 0, 512, 512);

    // Micro mesh texture
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    for (let x = 0; x < 512; x += 8) {
      for (let y = 0; y < 512; y += 8) {
        ctx.fillRect(x, y, 4, 4);
      }
    }

    // Upper back horizontal teal band
    ctx.fillStyle = "rgba(14, 176, 186, 0.25)";
    ctx.fillRect(0, 100, 512, 95);

    // Athletic side accent stripes
    ctx.fillStyle = "#0eb0ba";
    ctx.fillRect(20, 0, 12, 512);
    ctx.fillStyle = "#ff5a1f";
    ctx.fillRect(480, 0, 12, 512);

    // Name across upper back: "GEEKROOM" (positioned cleanly below helmet line)
    ctx.save();
    ctx.font = "900 62px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
    ctx.fillText("GEEKROOM", 258, 150);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 6;
    ctx.strokeText("GEEKROOM", 256, 146);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("GEEKROOM", 256, 146);
    ctx.restore();

    // HUGE BOLD ATHLETIC NUMBER "7" IN CENTER
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const numY = 325;

    ctx.font = "900 230px sans-serif";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 26;
    ctx.lineJoin = "round";
    ctx.strokeText("7", 256, numY);

    ctx.fillStyle = "#ff5a1f";
    ctx.fillText("7", 256, numY);

    ctx.strokeStyle = "#ffa17a";
    ctx.lineWidth = 4;
    ctx.strokeText("7", 256, numY);
    ctx.restore();

    // Bottom society hashtag
    ctx.fillStyle = "#0eb0ba";
    ctx.font = "700 16px monospace";
    ctx.textAlign = "center";
    ctx.fillText("#BuildLearnBelong", 256, 475);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeSoccerBallTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, 512, 512);

    const drawPolygon = (cx: number, cy: number, r: number, sides: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const a = (i * 2 * Math.PI) / sides - Math.PI / 2;
        const px = cx + Math.cos(a) * r;
        const py = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    };

    drawPolygon(256, 256, 75, 5, "#121422");

    const outerCoords = [
      [100, 110],
      [412, 110],
      [100, 402],
      [412, 402],
      [256, 50],
      [256, 462],
      [50, 256],
      [462, 256],
    ];
    for (const [ox, oy] of outerCoords) {
      drawPolygon(ox, oy, 60, 6, "#181a28");
    }

    ctx.strokeStyle = "#0eb0ba";
    ctx.lineWidth = 5;
    for (const [ox, oy] of outerCoords) {
      ctx.beginPath();
      ctx.moveTo(256, 256);
      ctx.lineTo(ox, oy);
      ctx.stroke();
    }

    ctx.fillStyle = "#0eb0ba";
    ctx.font = "900 20px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("<GR/>", 256, 256);

    ctx.fillStyle = "#ff5a1f";
    ctx.font = "900 13px sans-serif";
    ctx.fillText("#7", 256, 280);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function updateVisorCanvas(canvas: HTMLCanvasElement, expr: TrickType) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, 256, 256);
  const bg = ctx.createLinearGradient(0, 0, 0, 256);
  bg.addColorStop(0, "#08090f");
  bg.addColorStop(1, "#121422");
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.roundRect(14, 14, 228, 228, 36);
  ctx.fill();

  ctx.strokeStyle = "rgba(14, 176, 186, 0.4)";
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.fillStyle = "rgba(14, 176, 186, 0.05)";
  for (let y = 20; y < 240; y += 6) {
    ctx.fillRect(20, y, 216, 2);
  }

  const teal = "#0eb0ba";
  const orange = "#ff5a1f";

  if (expr === "idle") {
    for (const cx of [82, 174]) {
      const g = ctx.createRadialGradient(cx, 126, 6, cx, 126, 28);
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.45, teal);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, 126, 28, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx, 126, 9, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (expr === "suii") {
    for (const cx of [82, 174]) {
      ctx.fillStyle = orange;
      ctx.beginPath();
      const dir = cx === 82 ? 1 : -1;
      ctx.moveTo(cx - dir * 28, 98);
      ctx.lineTo(cx + dir * 28, 116);
      ctx.lineTo(cx + dir * 26, 126);
      ctx.lineTo(cx - dir * 28, 108);
      ctx.closePath();
      ctx.fill();

      const g = ctx.createRadialGradient(cx, 134, 4, cx, 134, 22);
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.5, "#ff5a1f");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, 134, 22, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = teal;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(128, 162, 24, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
  } else if (expr === "somersault") {
    for (const cx of [82, 174]) {
      ctx.strokeStyle = orange;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.arc(cx, 126, 24, 0.15 * Math.PI, 1.85 * Math.PI);
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx, 126, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (expr === "jump") {
    for (const cx of [82, 174]) {
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = teal;
      ctx.lineWidth = 5;
      ctx.save();
      ctx.translate(cx, 126);
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(0, -28);
        ctx.lineTo(7, -8);
        ctx.rotate(Math.PI / 2);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  } else if (expr === "fall") {
    ctx.strokeStyle = orange;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    for (const cx of [82, 174]) {
      ctx.beginPath();
      ctx.moveTo(cx - 16, 110);
      ctx.lineTo(cx + 16, 142);
      ctx.moveTo(cx + 16, 110);
      ctx.lineTo(cx - 16, 142);
      ctx.stroke();
    }
    ctx.fillStyle = "#60a5fa";
    ctx.beginPath();
    ctx.arc(206, 75, 9, 0, Math.PI * 2);
    ctx.fill();
  } else if (expr === "say_hi") {
    ctx.strokeStyle = teal;
    ctx.lineWidth = 9;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(82, 136, 22, 1.15 * Math.PI, 1.85 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(174, 136, 22, 1.15 * Math.PI, 1.85 * Math.PI);
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 90, 31, 0.55)";
    ctx.beginPath();
    ctx.arc(66, 156, 13, 0, Math.PI * 2);
    ctx.arc(190, 156, 13, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(128, 168, 16, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
  }
}

// ============================================================================
// ROTATING COMMUNITY & MOTIVATIONAL QUOTES (Every 10 to 15 seconds)
// A blend of funny hacker humor, motivational builder energy, and society perks.
// ============================================================================
const ROBOT_QUOTES: string[] = [
  "Why debug alone? Join Geek Room! 🚀",
  "150K+ builders can't be wrong. Join us! 👥",
  "Stop dreaming, start shipping. Let's build! ⚡",
  "Your next co-founder is right here 👀",
  "Even my bugs have bugs... still building! 🐛",
  "Code isn't coffee, but fuels our nights ☕",
  "Win hackathons. Meet founders. Belong. 🏆",
  "Eat. Code. SIUUU. Repeat. ⚽",
  "80+ partner companies want to hire you 💼",
  "Real builders build in public. Hop in! 🔥",
  "Sleep is temporary, hackathon glory forever 🍕",
  "Zero gatekeeping, 100% building 🤝",
  "Don't just watch tech happen. Build it! 💡",
  "Great engineers aren't born, they're compiled 🛠️",
  "Your wildest projects start with one commit ✨",
  "404: Excuses not found in Geek Room 🎯",
  "Turn campus coding into 10x engineering 🚀",
  "It worked on my localhost, trust me bro 💻",
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ChinkuRobot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hitboxRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const activeTrickRef = useRef<TrickType>("idle");
  const trickTimerRef = useRef(0);

  const quoteIndexRef = useRef(0);
  const [speechText, setSpeechText] = useState(ROBOT_QUOTES[0]);
  const [currentTrickIndex, setCurrentTrickIndex] = useState(0);

  // Periodically rotate through quotes every 10 to 15 seconds when idle
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const scheduleNext = () => {
      // 10,000ms to 15,000ms randomized interval
      const delay = 10000 + Math.random() * 5000;
      timer = setTimeout(() => {
        if (activeTrickRef.current === "idle") {
          quoteIndexRef.current = (quoteIndexRef.current + 1) % ROBOT_QUOTES.length;
          setSpeechText(ROBOT_QUOTES[quoteIndexRef.current]);
        }
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => clearTimeout(timer);
  }, []);

  const triggerTrick = useCallback((trick: TrickType) => {
    activeTrickRef.current = trick;
    trickTimerRef.current = 0;

    switch (trick) {
      case "suii":
        setSpeechText("SIUUUUUUUU! 💥 #7");
        break;
      case "somersault":
        setSpeechText("Whoa! Somersault! 🤸");
        break;
      case "jump":
        setSpeechText("Super Jump! 🚀");
        break;
      case "fall":
        setSpeechText("Oof! 😵 Back on my feet! ✨");
        break;
      case "say_hi":
        setSpeechText("Hi there, builder! 👋");
        break;
      default:
        setSpeechText(ROBOT_QUOTES[quoteIndexRef.current]);
    }
  }, []);

  const handleNextTrick = useCallback(() => {
    const trickOrder: TrickType[] = ["suii", "somersault", "jump", "fall", "say_hi"];
    const nextIndex = currentTrickIndex % trickOrder.length;
    triggerTrick(trickOrder[nextIndex]);
    setCurrentTrickIndex((prev) => prev + 1);
  }, [currentTrickIndex, triggerTrick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = prefersReducedMotion();

    // Fixed ground plane coordinate
    const GROUND_Y = -1.2;
    const ROBOT_SCALE = 0.72;

    // -------------------------------------------------------------
    // THREE.JS SCENE & ORTHOGRAPHIC CAMERA SETUP
    // Orthographic Camera guarantees ZERO perspective distortion:
    // the robot has 100% identical, uniform dimensions from left to right.
    // -------------------------------------------------------------
    const scene = new THREE.Scene();
    const VIEW_HEIGHT = 4.6;

    const computeCamera = (w: number, h: number) => {
      const aspect = Math.max(0.2, w / Math.max(1, h));
      const viewWidth = VIEW_HEIGHT * aspect;
      return new THREE.OrthographicCamera(
        -viewWidth / 2,
        viewWidth / 2,
        VIEW_HEIGHT / 2,
        -VIEW_HEIGHT / 2,
        0.1,
        100
      );
    };

    const camera = computeCamera(canvas.clientWidth, canvas.clientHeight || 260);
    camera.position.set(0, 0.35, 10);
    camera.lookAt(0, 0.35, 0);

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Lighting (Warm Key + Cool Fill + Teal/Orange Rims)
    const ambient = new THREE.AmbientLight(0xffffff, 1.05);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(4, 8, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xbad7ff, 0.6);
    fillLight.position.set(-5, 4, 6);
    scene.add(fillLight);

    const rimTeal = new THREE.DirectionalLight(0x0eb0ba, 1.4);
    rimTeal.position.set(5, 2, -4);
    scene.add(rimTeal);

    const rimOrange = new THREE.DirectionalLight(0xff5a1f, 1.4);
    rimOrange.position.set(-5, 1, -4);
    scene.add(rimOrange);

    // Dynamic Visor Canvas Texture
    const visorCanvas = document.createElement("canvas");
    visorCanvas.width = 256;
    visorCanvas.height = 256;
    updateVisorCanvas(visorCanvas, "idle");
    const visorTexture = new THREE.CanvasTexture(visorCanvas);
    visorTexture.colorSpace = THREE.SRGBColorSpace;

    // Materials
    const matJerseyFront = new THREE.MeshPhysicalMaterial({
      map: makeJerseyFrontTexture(),
      roughness: 0.45,
      metalness: 0.1,
      clearcoat: 0.3,
    });

    const matJerseyBack = new THREE.MeshPhysicalMaterial({
      map: makeJerseyBackTexture(),
      roughness: 0.45,
      metalness: 0.1,
      clearcoat: 0.3,
    });

    const matJerseyBase = new THREE.MeshPhysicalMaterial({
      color: 0x121420,
      roughness: 0.45,
      metalness: 0.1,
    });

    const matShorts = new THREE.MeshStandardMaterial({
      color: 0x0f1118,
      roughness: 0.6,
    });

    const matRoboDark = new THREE.MeshPhysicalMaterial({
      color: 0x1a1c28,
      metalness: 0.65,
      roughness: 0.25,
      clearcoat: 0.8,
    });

    const matRoboSteel = new THREE.MeshStandardMaterial({
      color: 0x8a929e,
      metalness: 0.9,
      roughness: 0.2,
    });

    const matTealGlow = new THREE.MeshStandardMaterial({
      color: 0x0eb0ba,
      emissive: new THREE.Color(0x0eb0ba),
      emissiveIntensity: 0.85,
      roughness: 0.2,
    });

    const matOrangeGlow = new THREE.MeshStandardMaterial({
      color: 0xff5a1f,
      emissive: new THREE.Color(0xff5a1f),
      emissiveIntensity: 0.9,
      roughness: 0.2,
    });

    const matWhiteStripe = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
    });

    const matCleat = new THREE.MeshStandardMaterial({
      color: 0x14161f,
      roughness: 0.35,
    });

    const matCleatSole = new THREE.MeshStandardMaterial({
      color: 0xff5a1f,
      roughness: 0.3,
    });

    const matVisor = new THREE.MeshPhysicalMaterial({
      map: visorTexture,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    // -------------------------------------------------------------
    // BUILD 3D ROBOT RIG: "Striker GR-7" (Scaled proportionately)
    // -------------------------------------------------------------
    const robotRoot = new THREE.Group();
    robotRoot.scale.setScalar(ROBOT_SCALE);
    scene.add(robotRoot);

    // Torso with Official Jersey
    const geomTorso = new RoundedBoxGeometry(1.2, 1.35, 0.78, 4, 0.12);
    const torsoMesh = new THREE.Mesh(geomTorso, [
      matJerseyBase,  // +X (right)
      matJerseyBase,  // -X (left)
      matJerseyBase,  // +Y (top collar)
      matShorts,      // -Y (bottom)
      matJerseyFront, // +Z (Front with Crest)
      matJerseyBack,  // -Z (Back with GEEKROOM and #7!)
    ]);
    torsoMesh.position.y = 1.45;
    robotRoot.add(torsoMesh);

    // Shorts / Pelvis
    const geomShorts = new RoundedBoxGeometry(1.15, 0.46, 0.72, 3, 0.08);
    const shortsMesh = new THREE.Mesh(geomShorts, matShorts);
    shortsMesh.position.y = 0.85;
    robotRoot.add(shortsMesh);

    // White stripes on shorts sides
    const stripeGeom = new THREE.BoxGeometry(0.04, 0.42, 0.16);
    const stripeL = new THREE.Mesh(stripeGeom, matWhiteStripe);
    stripeL.position.set(-0.58, 0.85, 0);
    robotRoot.add(stripeL);
    const stripeR = new THREE.Mesh(stripeGeom, matWhiteStripe);
    stripeR.position.set(0.58, 0.85, 0);
    robotRoot.add(stripeR);

    // LEGS & CLEATS
    const legLGroup = new THREE.Group();
    legLGroup.position.set(-0.34, 0.7, 0);
    robotRoot.add(legLGroup);

    const legRGroup = new THREE.Group();
    legRGroup.position.set(0.34, 0.7, 0);
    robotRoot.add(legRGroup);

    // Thighs
    const geomThigh = new THREE.CylinderGeometry(0.14, 0.13, 0.45, 16);
    const thighL = new THREE.Mesh(geomThigh, matShorts);
    thighL.position.y = -0.18;
    legLGroup.add(thighL);

    const thighR = new THREE.Mesh(geomThigh, matShorts);
    thighR.position.y = -0.18;
    legRGroup.add(thighR);

    // Knees with teal glow ring
    const geomKnee = new THREE.CylinderGeometry(0.14, 0.14, 0.1, 16);
    const kneeL = new THREE.Mesh(geomKnee, matTealGlow);
    kneeL.position.y = -0.42;
    legLGroup.add(kneeL);

    const kneeR = new THREE.Mesh(geomKnee, matTealGlow);
    kneeR.position.y = -0.42;
    legRGroup.add(kneeR);

    // Calves
    const geomCalf = new THREE.CylinderGeometry(0.12, 0.11, 0.4, 16);
    const calfL = new THREE.Mesh(geomCalf, matRoboSteel);
    calfL.position.y = -0.66;
    legLGroup.add(calfL);

    const calfR = new THREE.Mesh(geomCalf, matRoboSteel);
    calfR.position.y = -0.66;
    legRGroup.add(calfR);

    // Soccer Cleats
    function buildCleat(): THREE.Group {
      const cleat = new THREE.Group();
      const geomBoot = new RoundedBoxGeometry(0.32, 0.22, 0.58, 3, 0.08);
      const boot = new THREE.Mesh(geomBoot, matCleat);
      boot.position.set(0, 0, 0.08);
      cleat.add(boot);

      const geomSole = new RoundedBoxGeometry(0.34, 0.05, 0.6, 2, 0.02);
      const sole = new THREE.Mesh(geomSole, matCleatSole);
      sole.position.set(0, -0.11, 0.08);
      cleat.add(sole);

      const geomStud = new THREE.CylinderGeometry(0.025, 0.02, 0.05, 8);
      for (const [sx, sz] of [
        [-0.1, -0.12],
        [0.1, -0.12],
        [-0.1, 0.08],
        [0.1, 0.08],
        [-0.08, 0.24],
        [0.08, 0.24],
      ]) {
        const stud = new THREE.Mesh(geomStud, matWhiteStripe);
        stud.position.set(sx, -0.14, sz);
        cleat.add(stud);
      }
      return cleat;
    }

    const cleatL = buildCleat();
    cleatL.position.set(0, -0.84, 0);
    legLGroup.add(cleatL);

    const cleatR = buildCleat();
    cleatR.position.set(0, -0.84, 0);
    legRGroup.add(cleatR);

    // ARMS & SLEEVES
    const armLGroup = new THREE.Group();
    armLGroup.position.set(-0.72, 1.95, 0);
    robotRoot.add(armLGroup);

    const armRGroup = new THREE.Group();
    armRGroup.position.set(0.72, 1.95, 0);
    robotRoot.add(armRGroup);

    const geomSleeve = new THREE.CylinderGeometry(0.18, 0.16, 0.42, 16);
    const sleeveL = new THREE.Mesh(geomSleeve, matJerseyBase);
    sleeveL.position.y = -0.16;
    armLGroup.add(sleeveL);

    const sleeveR = new THREE.Mesh(geomSleeve, matJerseyBase);
    sleeveR.position.y = -0.16;
    armRGroup.add(sleeveR);

    const geomForearm = new THREE.CylinderGeometry(0.11, 0.09, 0.42, 16);
    const forearmL = new THREE.Mesh(geomForearm, matRoboSteel);
    forearmL.position.y = -0.48;
    armLGroup.add(forearmL);

    const forearmR = new THREE.Mesh(geomForearm, matRoboSteel);
    forearmR.position.y = -0.48;
    armRGroup.add(forearmR);

    const geomHand = new RoundedBoxGeometry(0.18, 0.18, 0.16, 3, 0.04);
    const handL = new THREE.Mesh(geomHand, matRoboDark);
    handL.position.y = -0.74;
    armLGroup.add(handL);

    const handR = new THREE.Mesh(geomHand, matRoboDark);
    handR.position.y = -0.74;
    armRGroup.add(handR);

    // HEAD & HELMET
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 2.32, 0);
    robotRoot.add(headGroup);

    const geomHead = new RoundedBoxGeometry(1.18, 1.05, 0.95, 4, 0.18);
    const headMesh = new THREE.Mesh(geomHead, matRoboDark);
    headGroup.add(headMesh);

    const geomVisor = new RoundedBoxGeometry(0.96, 0.82, 0.16, 3, 0.1);
    const visorMesh = new THREE.Mesh(geomVisor, matVisor);
    visorMesh.position.set(0, 0, 0.44);
    headGroup.add(visorMesh);

    const geomEar = new THREE.CylinderGeometry(0.24, 0.24, 0.18, 16);
    geomEar.rotateZ(Math.PI / 2);
    const earL = new THREE.Mesh(geomEar, matRoboDark);
    earL.position.set(-0.64, 0, 0);
    headGroup.add(earL);

    const earR = new THREE.Mesh(geomEar, matRoboDark);
    earR.position.set(0.64, 0, 0);
    headGroup.add(earR);

    const geomEarRing = new THREE.TorusGeometry(0.17, 0.03, 8, 24);
    geomEarRing.rotateY(Math.PI / 2);
    const ringL = new THREE.Mesh(geomEarRing, matTealGlow);
    ringL.position.set(-0.73, 0, 0);
    headGroup.add(ringL);

    const ringR = new THREE.Mesh(geomEarRing, matTealGlow);
    ringR.position.set(0.73, 0, 0);
    headGroup.add(ringR);

    const geomStalk = new THREE.CylinderGeometry(0.02, 0.025, 0.38, 8);
    const stalk = new THREE.Mesh(geomStalk, matRoboSteel);
    stalk.position.set(0, 0.68, 0);
    headGroup.add(stalk);

    const geomBeacon = new THREE.SphereGeometry(0.08, 16, 16);
    const beacon = new THREE.Mesh(geomBeacon, matOrangeGlow);
    beacon.position.set(0, 0.88, 0);
    headGroup.add(beacon);

    // -------------------------------------------------------------
    // HIGH-TECH SOCCER MATCH BALL (Scaled to companion size)
    // -------------------------------------------------------------
    const geomBall = new THREE.SphereGeometry(0.28, 28, 28);
    const matBall = new THREE.MeshStandardMaterial({
      map: makeSoccerBallTexture(),
      roughness: 0.25,
      metalness: 0.1,
    });
    const ballMesh = new THREE.Mesh(geomBall, matBall);
    ballMesh.scale.setScalar(ROBOT_SCALE);
    scene.add(ballMesh);

    // Ground Shadow Plate (Under robot)
    const geomShadow = new THREE.CircleGeometry(0.9, 32);
    geomShadow.rotateX(-Math.PI / 2);
    const matShadow = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.38,
    });
    const shadowMesh = new THREE.Mesh(geomShadow, matShadow);
    shadowMesh.position.y = GROUND_Y;
    scene.add(shadowMesh);

    // -------------------------------------------------------------
    // VIEWPORT BOUNDS & SCROLL DETECTION
    // -------------------------------------------------------------
    let minX = -3.8;
    let maxX = 3.8;

    const computeBounds = () => {
      const w = window.innerWidth;
      const h = canvas.clientHeight || 260;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);

      const aspect = w / h;
      const viewWidth = VIEW_HEIGHT * aspect;
      camera.left = -viewWidth / 2;
      camera.right = viewWidth / 2;
      camera.top = VIEW_HEIGHT / 2;
      camera.bottom = -VIEW_HEIGHT / 2;
      camera.updateProjectionMatrix();

      // Ensure the mascot stays safely visible on screen with comfortable margin
      minX = -viewWidth / 2 + 1.25;
      maxX = viewWidth / 2 - 1.25;
    };

    window.addEventListener("resize", computeBounds);
    computeBounds();

    let scrollProgress = 0;
    let isActivelyScrolling = false;
    let scrollStopTimer: NodeJS.Timeout | number;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

      isActivelyScrolling = true;
      clearTimeout(scrollStopTimer);
      scrollStopTimer = setTimeout(() => {
        isActivelyScrolling = false;
      }, 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // -------------------------------------------------------------
    // ANIMATION & KINEMATICS ENGINE
    // -------------------------------------------------------------
    let lastTime = performance.now();
    let prevExpr: TrickType = "idle";
    let currentX = minX;
    let curFacingYaw = 0;
    let walkPhase = 0;
    const tempProj = new THREE.Vector3();

    let rafId: number;

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      const currentTrick = activeTrickRef.current;

      // Update Visor Texture on Trick change
      if (currentTrick !== prevExpr) {
        updateVisorCanvas(visorCanvas, currentTrick);
        visorTexture.needsUpdate = true;
        prevExpr = currentTrick;
      }

      // Antenna beacon pulse
      const pulse = 0.7 + 0.3 * Math.sin(now * 0.006);
      matOrangeGlow.emissiveIntensity = pulse;

      // Calculate Target X from Scroll Progress
      const targetX = minX + scrollProgress * (maxX - minX);
      const dx = targetX - currentX;
      const speed = Math.abs(dx);

      // Smooth horizontal position interpolation
      currentX += dx * Math.min(1, dt * 6.5);
      robotRoot.position.x = currentX;
      shadowMesh.position.x = currentX;

      // Sync 2D Hitbox and Speech Bubble DOM elements with 3D Robot Position
      tempProj.set(currentX, GROUND_Y + 1.6 * ROBOT_SCALE, 0);
      tempProj.project(camera);
      const screenX = ((tempProj.x + 1) / 2) * window.innerWidth;
      if (hitboxRef.current) {
        hitboxRef.current.style.transform = `translate3d(${screenX - 52}px, 0, 0)`;
      }
      if (bubbleRef.current) {
        bubbleRef.current.style.transform = `translate3d(${screenX}px, 0, 0) translateX(-50%)`;
      }

      // -----------------------------------------------------------
      // BEHAVIOR MODES
      // -----------------------------------------------------------
      if (currentTrick === "idle") {
        const isWalking = (speed > 0.004 || isActivelyScrolling) && !reduced;

        if (isWalking) {
          // =======================================================
          // WALKING & KICKING THE BALL
          // When scrolling down (dx > 0): walks right, facing right!
          // When scrolling up (dx < 0): walks left, facing left!
          // =======================================================
          walkPhase += dt * Math.min(18, speed * 16 + 8);

          // Turn body towards the direction of travel (~70° profile)
          const targetFacing = dx >= 0 ? Math.PI * 0.42 : -Math.PI * 0.42;
          curFacingYaw += (targetFacing - curFacingYaw) * Math.min(1, dt * 9);
          robotRoot.rotation.set(0, curFacingYaw, 0);

          // Legs walk cycle
          legLGroup.rotation.x = Math.sin(walkPhase) * 0.65;
          legRGroup.rotation.x = -Math.sin(walkPhase) * 0.65;
          legLGroup.rotation.z = 0;
          legRGroup.rotation.z = 0;

          // Calf flexion on back-swing
          calfL.rotation.x = legLGroup.rotation.x < 0 ? -Math.abs(legLGroup.rotation.x) * 0.6 : 0;
          calfR.rotation.x = legRGroup.rotation.x < 0 ? -Math.abs(legRGroup.rotation.x) * 0.6 : 0;

          // Arms natural counter-swing
          armLGroup.rotation.x = -Math.sin(walkPhase) * 0.55;
          armLGroup.rotation.z = -0.08;
          armRGroup.rotation.x = Math.sin(walkPhase) * 0.55;
          armRGroup.rotation.z = 0.08;
          forearmL.rotation.set(0, 0, 0);
          forearmR.rotation.set(0, 0, 0);

          // Torso bounce
          const stepBounce = Math.abs(Math.sin(walkPhase * 2)) * 0.06;
          robotRoot.position.y = GROUND_Y + stepBounce;
          torsoMesh.rotation.set(0.04, 0, Math.sin(walkPhase) * 0.02);

          // Head looks ahead towards direction of travel
          headGroup.rotation.y = (targetFacing - curFacingYaw) * 0.4;
          headGroup.rotation.z = 0;

          // Dribbling the ball ahead in travel direction
          const kickCycle = Math.sin(walkPhase);
          if (dx >= 0) {
            ballMesh.position.x = currentX + 0.65 + Math.max(0, kickCycle) * 0.28;
            ballMesh.position.y = GROUND_Y + 0.14 + Math.max(0, Math.sin(walkPhase * 2)) * 0.12;
            ballMesh.position.z = 0.3;
            ballMesh.rotation.z -= dt * (speed * 18 + 7);
          } else {
            ballMesh.position.x = currentX - 0.65 - Math.max(0, -kickCycle) * 0.28;
            ballMesh.position.y = GROUND_Y + 0.14 + Math.max(0, Math.sin(walkPhase * 2)) * 0.12;
            ballMesh.position.z = 0.3;
            ballMesh.rotation.z += dt * (speed * 18 + 7);
          }
          ballMesh.rotation.x += dt * 3;
          shadowMesh.scale.setScalar(ROBOT_SCALE * (1 - stepBounce * 0.6));
        } else {
          // =======================================================
          // AT REST: FACING DIRECTLY TOWARDS THE USER!
          // Whenever the user stops scrolling anywhere on the page,
          // the mascot turns smoothly to face the user.
          // =======================================================
          const t = now * 0.003;
          const idleBounce = reduced ? 0 : Math.sin(t) * 0.02;
          robotRoot.position.y = GROUND_Y + idleBounce;

          // Smoothly rotate to face front (0 radians)
          curFacingYaw += (0 - curFacingYaw) * Math.min(1, dt * 7);
          robotRoot.rotation.set(0, curFacingYaw, 0);
          torsoMesh.rotation.set(0, 0, Math.sin(t * 0.5) * 0.015);

          // Arms breathing sway
          armLGroup.rotation.set(Math.sin(t) * 0.06, 0, -0.06);
          armRGroup.rotation.set(-Math.sin(t) * 0.06, 0, 0.06);
          forearmL.rotation.set(0, 0, 0);
          forearmR.rotation.set(0, 0, 0);

          legLGroup.rotation.set(0, 0, 0);
          legRGroup.rotation.set(0, 0, 0);
          calfL.rotation.set(0, 0, 0);
          calfR.rotation.set(0, 0, 0);
          headGroup.rotation.set(0, 0, 0);

          // Soccer ball rests comfortably beside cleat, gentle spin
          ballMesh.position.set(currentX + 0.55, GROUND_Y + 0.14, 0.3);
          ballMesh.rotation.y += dt * 0.7;
          shadowMesh.scale.setScalar(ROBOT_SCALE * (1 - idleBounce * 0.6));
        }
      } else if (currentTrick === "suii") {
        // =========================================================
        // TRICK: CRISTIANO RONALDO'S ICONIC "SIUUU" CELEBRATION
        // 1. Twirls finger in circle in the air winding up
        // 2. High explosive leap with 180° airborne spin
        // 3. Lands emphatically in back power stance showing "GEEKROOM" & #7
        // 4. Shouts "SIUUUUUUUU! 💥 #7", then turns back to user
        // =========================================================
        trickTimerRef.current += dt;
        const duration = 3.3;
        const u = Math.min(1, trickTimerRef.current / duration);

        ballMesh.position.set(currentX + 0.55, GROUND_Y + 0.14, 0.3);
        ballMesh.rotation.y += dt * 1.5;

        if (u < 0.32) {
          // PHASE 1: WINDING UP & CIRCULAR FINGER TWIRL IN THE AIR
          robotRoot.position.y = GROUND_Y;
          robotRoot.rotation.set(0, 0, 0);

          // Right arm raised high
          armRGroup.rotation.z = 2.45;
          armRGroup.rotation.x = -0.3;

          // Circular winding motion of forearm & hand
          const twirlAngle = now * 0.024;
          forearmR.rotation.x = Math.sin(twirlAngle) * 0.7;
          forearmR.rotation.y = Math.cos(twirlAngle) * 0.7;

          // Left arm held wide with athletic attitude
          armLGroup.rotation.z = -0.4;
          armLGroup.rotation.x = 0.25;

          // Preparatory athletic spring steps
          legLGroup.rotation.x = Math.sin(now * 0.015) * 0.2;
          legRGroup.rotation.x = -Math.sin(now * 0.015) * 0.2;
          torsoMesh.rotation.set(0, 0, 0);
          shadowMesh.scale.setScalar(ROBOT_SCALE);
        } else if (u < 0.58) {
          // PHASE 2: EXPLOSIVE LEAP & AIRBORNE 180° SPIN
          const flight = (u - 0.32) / (0.58 - 0.32);
          const jumpH = Math.sin(flight * Math.PI) * 1.45;
          robotRoot.position.y = GROUND_Y + jumpH;

          // Smooth 180° mid-air spin to face away from the camera
          robotRoot.rotation.y = flight * Math.PI;
          robotRoot.rotation.x = 0;

          // Arms tuck in preparation for downward slam
          armLGroup.rotation.z = -0.2 - flight * 0.2;
          armRGroup.rotation.z = 0.2 + flight * 0.2;
          armLGroup.rotation.x = 0;
          armRGroup.rotation.x = 0;
          forearmL.rotation.set(0, 0, 0);
          forearmR.rotation.set(0, 0, 0);

          legLGroup.rotation.set(-0.25, 0, -0.15);
          legRGroup.rotation.set(-0.25, 0, 0.15);

          shadowMesh.scale.setScalar(ROBOT_SCALE * Math.max(0.2, 1 - jumpH * 0.4));
        } else if (u < 0.88) {
          // PHASE 3: THE ICONIC BACK POWER LANDING — "SIUUUUUUUU! 💥 #7"
          // Lands facing 180° away from camera: GEEKROOM & #7 are fully displayed!
          robotRoot.position.y = GROUND_Y;
          robotRoot.rotation.set(0, Math.PI, 0);

          // Wide power-stance legs
          legLGroup.rotation.set(0.12, 0, -0.36);
          legRGroup.rotation.set(0.12, 0, 0.36);
          calfL.rotation.set(0, 0, 0);
          calfR.rotation.set(0, 0, 0);

          // Arms thrust backwards & downwards in classic Ronaldo landing pose
          armLGroup.rotation.set(0.95, 0, -0.55);
          armRGroup.rotation.set(0.95, 0, 0.55);
          forearmL.rotation.set(0, 0, 0);
          forearmR.rotation.set(0, 0, 0);

          // Torso arched slightly back towards camera
          torsoMesh.rotation.set(0.14, 0, 0);
          headGroup.rotation.set(0.1, 0, 0);

          shadowMesh.scale.setScalar(ROBOT_SCALE * 1.35);
        } else {
          // PHASE 4: RECOVER & SMOOTHLY TURN BACK TO FACE USER
          const ret = (u - 0.88) / 0.12;
          robotRoot.position.y = GROUND_Y;
          robotRoot.rotation.set(0, Math.PI * (1 - ret), 0);

          legLGroup.rotation.set(0, 0, -0.36 * (1 - ret));
          legRGroup.rotation.set(0, 0, 0.36 * (1 - ret));
          armLGroup.rotation.set(0.95 * (1 - ret), 0, -0.55 * (1 - ret));
          armRGroup.rotation.set(0.95 * (1 - ret), 0, 0.55 * (1 - ret));
          torsoMesh.rotation.set(0.14 * (1 - ret), 0, 0);
          headGroup.rotation.set(0, 0, 0);
          shadowMesh.scale.setScalar(ROBOT_SCALE);
        }

        if (u >= 1) {
          activeTrickRef.current = "idle";
          curFacingYaw = 0;
          setSpeechText("SIUUU! GEEKROOM #7 🔥");
          setTimeout(() => {
            if (activeTrickRef.current === "idle") {
              setSpeechText(ROBOT_QUOTES[quoteIndexRef.current]);
            }
          }, 2200);
        }
      } else if (currentTrick === "somersault") {
        // TRICK: SOMERSAULT (360° airborne flip with athletic tuck & stick landing)
        trickTimerRef.current += dt;
        const duration = 1.35;
        const u = Math.min(1, trickTimerRef.current / duration);

        const flipHeight = Math.sin(u * Math.PI) * 1.35;
        robotRoot.position.y = GROUND_Y + flipHeight;
        robotRoot.rotation.x = -u * Math.PI * 2;
        robotRoot.rotation.y = 0;

        ballMesh.position.set(currentX + 0.55, GROUND_Y + 0.14, 0.3);

        if (u < 0.85) {
          armLGroup.rotation.x = -1.2;
          armRGroup.rotation.x = -1.2;
          legLGroup.rotation.x = -0.8;
          legRGroup.rotation.x = -0.8;
        } else {
          armLGroup.rotation.x = 0;
          armRGroup.rotation.x = 0;
          legLGroup.rotation.x = 0;
          legRGroup.rotation.x = 0;
        }

        shadowMesh.scale.setScalar(ROBOT_SCALE * Math.max(0.3, 1 - flipHeight * 0.4));

        if (u >= 1) {
          activeTrickRef.current = "idle";
          robotRoot.rotation.set(0, 0, 0);
          robotRoot.position.y = GROUND_Y;
          setSpeechText("Nailed the landing! ⚽");
          setTimeout(() => {
            if (activeTrickRef.current === "idle") {
              setSpeechText(ROBOT_QUOTES[quoteIndexRef.current]);
            }
          }, 2200);
        }
      } else if (currentTrick === "jump") {
        // TRICK: HIGH JUMP (Explosive vertical rocket leap with arms spread)
        trickTimerRef.current += dt;
        const duration = 1.1;
        const u = Math.min(1, trickTimerRef.current / duration);

        ballMesh.position.set(currentX + 0.55, GROUND_Y + 0.14, 0.3);

        let jumpY = 0;
        if (u < 0.18) {
          jumpY = -0.2 * (u / 0.18);
          legLGroup.rotation.x = 0.35;
          legRGroup.rotation.x = 0.35;
          armLGroup.rotation.x = -0.6;
          armRGroup.rotation.x = -0.6;
        } else if (u < 0.82) {
          const flightU = (u - 0.18) / (0.82 - 0.18);
          jumpY = Math.sin(flightU * Math.PI) * 1.45;
          armLGroup.rotation.z = -2.2;
          armRGroup.rotation.z = 2.2;
          legLGroup.rotation.x = -0.2;
          legRGroup.rotation.x = -0.2;
        } else {
          const landU = (u - 0.82) / (1 - 0.82);
          jumpY = -0.12 * Math.sin(landU * Math.PI);
          armLGroup.rotation.z = 0;
          armRGroup.rotation.z = 0;
          legLGroup.rotation.x = 0;
          legRGroup.rotation.x = 0;
        }

        robotRoot.position.y = GROUND_Y + jumpY;
        robotRoot.rotation.set(0, 0, 0);
        shadowMesh.scale.setScalar(ROBOT_SCALE * Math.max(0.2, 1 - Math.max(0, jumpY) * 0.45));

        if (u >= 1) {
          activeTrickRef.current = "idle";
          robotRoot.position.y = GROUND_Y;
          setSpeechText("That was high! 🚀");
          setTimeout(() => {
            if (activeTrickRef.current === "idle") {
              setSpeechText(ROBOT_QUOTES[quoteIndexRef.current]);
            }
          }, 2200);
        }
      } else if (currentTrick === "fall") {
        // TRICK: FALL & GET UP (Comedic tumble flat, dazed x_x, push up, stand proud)
        trickTimerRef.current += dt;
        const duration = 2.4;
        const u = Math.min(1, trickTimerRef.current / duration);

        ballMesh.position.set(currentX + 0.55, GROUND_Y + 0.14, 0.3);

        if (u < 0.28) {
          const p = u / 0.28;
          robotRoot.rotation.x = -p * (Math.PI * 0.46);
          robotRoot.position.y = GROUND_Y - p * 0.35;
          armLGroup.rotation.x = -1.2 * p;
          armRGroup.rotation.x = -1.2 * p;
        } else if (u < 0.58) {
          robotRoot.rotation.x = -Math.PI * 0.46;
          robotRoot.position.y = GROUND_Y - 0.35;
          headGroup.rotation.y = Math.sin(now * 0.02) * 0.25;
        } else if (u < 0.88) {
          const p = (u - 0.58) / 0.3;
          robotRoot.rotation.x = -Math.PI * 0.46 * (1 - p);
          robotRoot.position.y = GROUND_Y - 0.35 * (1 - p);
          armLGroup.rotation.x = 0.5 * (1 - p);
          armRGroup.rotation.x = 0.5 * (1 - p);
        } else {
          robotRoot.rotation.x = 0;
          robotRoot.position.y = GROUND_Y;
          headGroup.rotation.y = 0;
          armLGroup.rotation.x = 0;
          armRGroup.rotation.x = 0;
        }

        robotRoot.rotation.y = 0;

        if (u >= 1) {
          activeTrickRef.current = "idle";
          robotRoot.rotation.set(0, 0, 0);
          robotRoot.position.y = GROUND_Y;
          setSpeechText("I'm totally okay! ✨");
          setTimeout(() => {
            if (activeTrickRef.current === "idle") {
              setSpeechText(ROBOT_QUOTES[quoteIndexRef.current]);
            }
          }, 2200);
        }
      } else if (currentTrick === "say_hi") {
        // TRICK: SAYS HI BACK (Friendly wave + smiling eyes ^‿^ + greeting bubble)
        trickTimerRef.current += dt;
        const duration = 2.1;
        const u = Math.min(1, trickTimerRef.current / duration);

        ballMesh.position.set(currentX + 0.55, GROUND_Y + 0.14, 0.3);
        robotRoot.position.set(currentX, GROUND_Y, 0);
        robotRoot.rotation.set(0, 0, 0);

        headGroup.rotation.z = Math.sin(u * Math.PI) * 0.16;

        armRGroup.rotation.z = 2.3;
        armRGroup.rotation.x = -0.2;
        forearmR.rotation.z = Math.sin(now * 0.014) * 0.45;

        armLGroup.rotation.z = -0.3;
        armLGroup.rotation.x = 0.2;

        if (u >= 1) {
          armRGroup.rotation.set(0, 0, 0);
          forearmR.rotation.set(0, 0, 0);
          armLGroup.rotation.set(0, 0, 0);
          headGroup.rotation.set(0, 0, 0);
          activeTrickRef.current = "idle";
          setSpeechText("Let's build together! 🚀");
          setTimeout(() => {
            if (activeTrickRef.current === "idle") {
              setSpeechText(ROBOT_QUOTES[quoteIndexRef.current]);
            }
          }, 2200);
        }
      }

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scrollStopTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", computeBounds);
      renderer.dispose();
      matJerseyFront.map?.dispose();
      matJerseyBack.map?.dispose();
      matBall.map?.dispose();
      visorTexture.dispose();
      geomTorso.dispose();
      geomShorts.dispose();
      geomHead.dispose();
      geomVisor.dispose();
      geomBall.dispose();
      geomShadow.dispose();
    };
  }, []);

  return (
    <aside
      aria-label="Geek Room interactive mascot Striker GR-7"
      className="fixed inset-x-0 bottom-0 z-40 h-[260px] pointer-events-none select-none overflow-visible"
    >
      {/* 3D Canvas across the screen bottom (Orthographic, transparent, zero distortion) */}
      <canvas ref={canvasRef} className="absolute inset-0 size-full pointer-events-none" />

      {/* Floating Speech Commentary Bubble (Tracks directly above the mascot) */}
      <div
        ref={bubbleRef}
        onClick={handleNextTrick}
        className="absolute bottom-52 pointer-events-auto cursor-pointer transition-transform duration-75 z-20"
      >
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#181a27]/95 px-3.5 py-1.5 shadow-2xl backdrop-blur-md hover:border-[var(--orange)]/60 transition-colors max-w-[calc(100vw-32px)]">
          <span className="size-2 rounded-full bg-[var(--orange)] animate-pulse shrink-0" />
          <span className="font-mono text-[10px] font-bold text-[var(--teal)] shrink-0">
            GR-7:
          </span>
          <span className="text-xs font-black text-white whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-300">
            {speechText}
          </span>
        </div>
      </div>

      {/* Interactive Hitbox directly on the Robot (Click to trigger tricks!) */}
      <div
        ref={hitboxRef}
        onClick={handleNextTrick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleNextTrick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Geek Room mascot Striker GR-7. Click directly on robot to perform tricks."
        title="Click me to perform tricks! ⚽"
        className="absolute bottom-0 w-28 h-48 pointer-events-auto cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] rounded-3xl z-10"
      />
    </aside>
  );
}
