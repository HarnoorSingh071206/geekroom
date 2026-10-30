"use client";

/**
 * Geek Room — 3D Logo Scene (three.js)
 *
 * The official Geek Room logo rebuilt in 3D with pixel-perfect fidelity
 * to the reference asset (photos/Screenshot_20261025_224642.png):
 *
 * Visual Anatomy:
 * 1. Left Glyph ('<')  — Cyan-teal bracket with integrated vertical 'G' hook
 * 2. Right Glyph ('>') — Cyan-teal bracket with integrated diagonal 'R' leg
 * 3. Center Slash ('/') — Vibrant coral-orange tilted bar with keyboard notch teeth
 * 4. Eyes ('● ●')     — Crisp white circular nodes centered in the brackets
 *
 * 3D Craft & Motion:
 * - Extruded 3D geometry with beveling for specular highlights and edge sheen
 * - Responsive auto-scaling ensuring ideal proportions across all viewports
 * - Organic idle levitation (gentle vertical float, micro breathing roll)
 * - Interactive pointer tilt with damped spring physics for tactile depth
 * - Scroll-scrubbed exit: smoothly recedes and fades as the user scrolls into the story
 * - Reduced motion: renders one crisp, static reference frame
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { onScroll } from "animejs";
import { prefersReducedMotion } from "@/lib/animations/anime";
import {
  G_POINTS,
  R_POINTS,
  SLASH_POINTS,
  EYE_L,
  EYE_R,
} from "@/lib/data/logoVectors";

const FOV = 36;
const CAM_Z = 5.5;

/** Convert 2D coordinate array into a closed Three.js Shape */
function shapeFromPoints(points: [number, number][]): THREE.Shape {
  const shape = new THREE.Shape();
  if (points.length === 0) return shape;
  shape.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    shape.lineTo(points[i][0], points[i][1]);
  }
  shape.closePath();
  return shape;
}

/** Semicircular / circular shape for extruded eye nodes */
function circleShape(radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
  return shape;
}

/** Procedural code editor screen texture */
function makeLaptopScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 340;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Editor background
  ctx.fillStyle = "#0c1017";
  ctx.fillRect(0, 0, 512, 340);

  // Window titlebar
  ctx.fillStyle = "#151b26";
  ctx.fillRect(0, 0, 512, 30);

  // Window control dots
  ctx.fillStyle = "#ff5f56";
  ctx.beginPath();
  ctx.arc(18, 15, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffbd2e";
  ctx.beginPath();
  ctx.arc(32, 15, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#27c93f";
  ctx.beginPath();
  ctx.arc(46, 15, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Active tab
  ctx.fillStyle = "#1e2638";
  ctx.fillRect(68, 5, 125, 25);
  ctx.fillStyle = "#0eb0ba";
  ctx.font = "bold 11px monospace";
  ctx.fillText("geekroom.tsx", 80, 21);

  // Line numbers & code lines
  ctx.font = "13px 'SF Mono', Consolas, Menlo, monospace";
  const lines = [
    { num: "1", color: "#e85c2e", text: "import { Community } from '@geekroom';" },
    { num: "2", color: "#38bdf8", text: "const builders = await connect(150_000);" },
    { num: "3", color: "#4ade80", text: "// Building the future in public" },
    { num: "4", color: "#fbbf24", text: "export default function Hackathon() {" },
    { num: "5", color: "#0eb0ba", text: "  return <GeekRoom mode='winner' />;" },
    { num: "6", color: "#fbbf24", text: "}" },
    { num: "7", color: "#e2e8f0", text: "console.log('Ship it 🚀');" },
  ];

  lines.forEach((line, idx) => {
    const y = 62 + idx * 28;
    ctx.fillStyle = "#4b5563";
    ctx.fillText(line.num, 16, y);
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, 44, y);
  });

  // Glowing editor cursor
  ctx.fillStyle = "#0eb0ba";
  ctx.fillRect(238, 214, 8, 15);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Procedural laptop keyboard texture */
function makeKeyboardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 220;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = "#151821";
  ctx.fillRect(0, 0, 512, 220);

  // Key grid
  const rows = 5;
  const cols = 14;
  const kw = 28;
  const kh = 32;
  const gapX = 6;
  const gapY = 8;
  const startX = 20;
  const startY = 14;

  ctx.fillStyle = "#282d3d";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === 4 && c >= 3 && c <= 9) continue; // spacebar slot
      ctx.beginPath();
      ctx.roundRect(startX + c * (kw + gapX), startY + r * (kh + gapY), kw, kh, 3);
      ctx.fill();
    }
  }

  // Spacebar
  ctx.beginPath();
  ctx.roundRect(startX + 3 * (kw + gapX), startY + 4 * (kh + gapY), 7 * kw + 6 * gapX, kh, 4);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Procedural Energy Drink Can Label texture */
function makeCanLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Gradient background
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, "#080c14");
  grad.addColorStop(0.5, "#0d1829");
  grad.addColorStop(1, "#170c18");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Dynamic speed stripes
  ctx.save();
  ctx.strokeStyle = "rgba(14, 176, 186, 0.25)";
  ctx.lineWidth = 14;
  for (let i = -200; i < 700; i += 70) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 280, 512);
    ctx.stroke();
  }
  ctx.restore();

  // Top/bottom edge color bands
  ctx.fillStyle = "#0eb0ba";
  ctx.fillRect(0, 24, 512, 8);
  ctx.fillStyle = "#e85c2e";
  ctx.fillRect(0, 36, 512, 4);

  ctx.fillStyle = "#e85c2e";
  ctx.fillRect(0, 472, 512, 4);
  ctx.fillStyle = "#0eb0ba";
  ctx.fillRect(0, 480, 512, 8);

  // Electric Lightning Bolt in center
  ctx.save();
  ctx.shadowColor = "#0eb0ba";
  ctx.shadowBlur = 25;
  ctx.fillStyle = "#0eb0ba";
  ctx.beginPath();
  ctx.moveTo(256, 100);
  ctx.lineTo(295, 210);
  ctx.lineTo(262, 210);
  ctx.lineTo(290, 305);
  ctx.lineTo(215, 230);
  ctx.lineTo(248, 230);
  ctx.closePath();
  ctx.fill();

  // Inner bright core
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(256, 120);
  ctx.lineTo(280, 205);
  ctx.lineTo(254, 205);
  ctx.lineTo(272, 275);
  ctx.lineTo(228, 225);
  ctx.lineTo(250, 225);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Typography
  ctx.save();
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("GEEK FUEL", 256, 365);

  ctx.fillStyle = "#e85c2e";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("HACKATHON EDITION", 256, 400);

  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.font = "600 15px monospace";
  ctx.fillText("300mg CODE CAFFEINE • 0% CRASH", 256, 435);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function LogoScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const reduced = prefersReducedMotion();

    // --- Colors matching the official logo precisely ---
    const TEAL_HEX = 0x0eb0ba; // Official cyan/turquoise teal from logo
    const ORANGE_HEX = 0xe85c2e; // Official coral/orange from logo
    const WHITE_HEX = 0xffffff; // Crisp white

    const teal = new THREE.Color(TEAL_HEX);
    const orange = new THREE.Color(ORANGE_HEX);
    const white = new THREE.Color(WHITE_HEX);

    // --- Renderer / Scene / Camera ---
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      // Graceful fallback when WebGL context cannot be created
      return;
    }
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      FOV,
      canvas.clientWidth / Math.max(canvas.clientHeight, 1),
      0.1,
      100
    );
    camera.position.z = CAM_Z;

    // --- Lights ---
    // Balanced lighting so the front face matches the exact 2D logo colors,
    // while the beveled edges catch subtle specular light
    const ambient = new THREE.AmbientLight(0xffffff, 0.72);

    const key = new THREE.DirectionalLight(0xffffff, 1.15);
    key.position.set(3, 4, 5);

    const fill = new THREE.DirectionalLight(0x99ccdd, 0.5);
    fill.position.set(-3, -2, 4);

    const rimTeal = new THREE.DirectionalLight(teal, 0.85);
    rimTeal.position.set(-4, 1.5, 1);

    const rimOrange = new THREE.DirectionalLight(orange, 0.75);
    rimOrange.position.set(4, -1.5, 1);

    scene.add(ambient, key, fill, rimTeal, rimOrange);

    // --- Materials ---
    const matTeal = new THREE.MeshPhysicalMaterial({
      color: teal,
      emissive: teal,
      emissiveIntensity: 0.12,
      roughness: 0.28,
      metalness: 0.1,
      clearcoat: 0.35,
      clearcoatRoughness: 0.15,
      transparent: true,
    });

    const matOrange = new THREE.MeshPhysicalMaterial({
      color: orange,
      emissive: orange,
      emissiveIntensity: 0.15,
      roughness: 0.28,
      metalness: 0.1,
      clearcoat: 0.35,
      clearcoatRoughness: 0.15,
      transparent: true,
    });

    const matWhite = new THREE.MeshPhysicalMaterial({
      color: white,
      emissive: white,
      emissiveIntensity: 0.25,
      roughness: 0.18,
      metalness: 0.05,
      clearcoat: 0.5,
      transparent: true,
    });

    // --- Satellite Materials replaced with 3 Builder Items Materials ---
    const textureLaptop = makeLaptopScreenTexture();
    const textureKeyboard = makeKeyboardTexture();
    const textureCan = makeCanLabelTexture();

    // Aluminum / Space Gray for Laptop Chassis
    const matAlum = new THREE.MeshPhysicalMaterial({
      color: 0x7a8391,
      metalness: 0.88,
      roughness: 0.24,
      clearcoat: 0.4,
      transparent: true,
    });

    const matDarkDeck = new THREE.MeshPhysicalMaterial({
      color: 0x424854,
      metalness: 0.7,
      roughness: 0.32,
      clearcoat: 0.3,
      transparent: true,
    });

    const matKeyDeck = new THREE.MeshStandardMaterial({
      map: textureKeyboard,
      roughness: 0.45,
      metalness: 0.2,
      transparent: true,
    });

    const matScreen = new THREE.MeshStandardMaterial({
      map: textureLaptop,
      emissive: 0xffffff,
      emissiveMap: textureLaptop,
      emissiveIntensity: 0.82,
      roughness: 0.15,
      transparent: true,
    });

    // Championship Mirror Gold for Trophy
    const matGold = new THREE.MeshPhysicalMaterial({
      color: 0xffce2b,
      emissive: new THREE.Color(0x422a00),
      emissiveIntensity: 0.2,
      metalness: 0.95,
      roughness: 0.16,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1,
      transparent: true,
    });

    const matObsidian = new THREE.MeshPhysicalMaterial({
      color: 0x10141c,
      roughness: 0.22,
      metalness: 0.4,
      clearcoat: 0.7,
      transparent: true,
    });

    const matGem = new THREE.MeshStandardMaterial({
      color: teal,
      emissive: teal,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      transparent: true,
    });

    // Energy Drink Can Materials
    const matCan = new THREE.MeshPhysicalMaterial({
      map: textureCan,
      metalness: 0.45,
      roughness: 0.24,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      transparent: true,
    });

    const matCanMetal = new THREE.MeshPhysicalMaterial({
      color: 0xd2d7de,
      metalness: 0.92,
      roughness: 0.18,
      clearcoat: 0.6,
      transparent: true,
    });

    const matPullTab = new THREE.MeshPhysicalMaterial({
      color: orange,
      emissive: orange,
      emissiveIntensity: 0.25,
      metalness: 0.85,
      roughness: 0.25,
      transparent: true,
    });

    const matLidBadge = new THREE.MeshStandardMaterial({
      color: teal,
      emissive: teal,
      emissiveIntensity: 0.85,
      roughness: 0.2,
      transparent: true,
    });

    const materials: THREE.Material[] = [
      matTeal,
      matOrange,
      matWhite,
      matAlum,
      matDarkDeck,
      matKeyDeck,
      matScreen,
      matGold,
      matObsidian,
      matGem,
      matCan,
      matCanMetal,
      matPullTab,
      matLidBadge,
    ];

    // --- Geometry Extrusion Settings ---
    const glyphExtrude = {
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.024,
      bevelSize: 0.018,
      bevelSegments: 4,
      curveSegments: 24,
    };

    const eyeExtrude = {
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.024,
      bevelSize: 0.018,
      bevelSegments: 4,
      curveSegments: 32,
    };

    // --- Construct Logo Group ---
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // 1. Left glyph (G)
    const leftMesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shapeFromPoints(G_POINTS), glyphExtrude),
      matTeal
    );

    // 2. Right glyph (R)
    const rightMesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shapeFromPoints(R_POINTS), glyphExtrude),
      matTeal
    );

    // 3. Center slash (keyboard notch bar)
    const slashMesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shapeFromPoints(SLASH_POINTS), glyphExtrude),
      matOrange
    );
    slashMesh.position.z = 0.015; // slightly proud so front edge stands out crisply

    // 4. Left eye
    const eyeLMesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(circleShape(EYE_L.radius), eyeExtrude),
      matWhite
    );
    eyeLMesh.position.set(EYE_L.x, EYE_L.y, 0.01);

    // 5. Right eye
    const eyeRMesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(circleShape(EYE_R.radius), eyeExtrude),
      matWhite
    );
    eyeRMesh.position.set(EYE_R.x, EYE_R.y, 0.01);

    logoGroup.add(leftMesh, rightMesh, slashMesh, eyeLMesh, eyeRMesh);

    // -------------------------------------------------------------
    // 3 BUILDER ICONS REVOLVING AROUND THE THREE.JS LOGO:
    // 1. Laptop (Hackathon dev machine with glowing code editor)
    // 2. Championship Trophy (Golden victory cup with dual handles)
    // 3. Energy Drink Can (Chilled Geek Fuel can with pull tab)
    // -------------------------------------------------------------

    // Item 1: Laptop
    const propLaptop = new THREE.Group();
    {
      // Base clamshell chassis
      const geomBase = new RoundedBoxGeometry(0.56, 0.022, 0.38, 2, 0.008);
      const baseMesh = new THREE.Mesh(geomBase, matAlum);
      propLaptop.add(baseMesh);

      // Keyboard deck plane
      const geomKey = new THREE.PlaneGeometry(0.48, 0.19);
      const keyMesh = new THREE.Mesh(geomKey, matKeyDeck);
      keyMesh.rotation.x = -Math.PI / 2;
      keyMesh.position.set(0, 0.012, -0.065);
      propLaptop.add(keyMesh);

      // Trackpad
      const geomTrackpad = new RoundedBoxGeometry(0.17, 0.003, 0.11, 2, 0.003);
      const trackpad = new THREE.Mesh(geomTrackpad, matDarkDeck);
      trackpad.position.set(0, 0.012, 0.095);
      propLaptop.add(trackpad);

      // Screen lid hinge group (pivot at back edge)
      const screenLid = new THREE.Group();
      screenLid.position.set(0, 0.011, -0.19);
      screenLid.rotation.x = -Math.PI * 0.62; // ~112° open angle

      // Screen back casing
      const geomLidCase = new RoundedBoxGeometry(0.56, 0.37, 0.012, 2, 0.006);
      const lidCase = new THREE.Mesh(geomLidCase, matAlum);
      lidCase.position.set(0, 0.185, 0);
      screenLid.add(lidCase);

      // Glowing display panel
      const geomScreen = new THREE.PlaneGeometry(0.51, 0.32);
      const screenPane = new THREE.Mesh(geomScreen, matScreen);
      screenPane.position.set(0, 0.185, 0.007);
      screenLid.add(screenPane);

      // Back lid glowing Geek Room badge
      const geomLidBadge = new THREE.CircleGeometry(0.028, 16);
      const lidBadge = new THREE.Mesh(geomLidBadge, matLidBadge);
      lidBadge.position.set(0, 0.185, -0.007);
      lidBadge.rotation.y = Math.PI;
      screenLid.add(lidBadge);

      propLaptop.add(screenLid);
    }

    // Item 2: Trophy (Golden Hackathon Championship Cup)
    const propTrophy = new THREE.Group();
    {
      // Tier 1 Base: Obsidian block
      const geomBaseTier1 = new RoundedBoxGeometry(0.24, 0.05, 0.24, 2, 0.01);
      const baseTier1 = new THREE.Mesh(geomBaseTier1, matObsidian);
      propTrophy.add(baseTier1);

      // Tier 2 Base: Obsidian tapered collar
      const geomBaseTier2 = new THREE.CylinderGeometry(0.12, 0.15, 0.04, 20);
      const baseTier2 = new THREE.Mesh(geomBaseTier2, matObsidian);
      baseTier2.position.set(0, 0.045, 0);
      propTrophy.add(baseTier2);

      // Gold collar ring
      const geomCollar = new THREE.TorusGeometry(0.11, 0.014, 8, 24);
      geomCollar.rotateX(Math.PI / 2);
      const collar = new THREE.Mesh(geomCollar, matGold);
      collar.position.set(0, 0.065, 0);
      propTrophy.add(collar);

      // Gold nameplate on front of base
      const geomPlate = new THREE.PlaneGeometry(0.14, 0.03);
      const plate = new THREE.Mesh(geomPlate, matGold);
      plate.position.set(0, 0.025, 0.122);
      propTrophy.add(plate);

      // Stem riser
      const geomStem = new THREE.CylinderGeometry(0.04, 0.065, 0.12, 20);
      const stem = new THREE.Mesh(geomStem, matGold);
      stem.position.set(0, 0.125, 0);
      propTrophy.add(stem);

      // Sphere node on stem
      const geomNode = new THREE.SphereGeometry(0.055, 16, 16);
      const node = new THREE.Mesh(geomNode, matGold);
      node.position.set(0, 0.185, 0);
      propTrophy.add(node);

      // Flared golden bowl
      const geomBowl = new THREE.CylinderGeometry(0.20, 0.10, 0.22, 24, 1, false);
      const bowl = new THREE.Mesh(geomBowl, matGold);
      bowl.position.set(0, 0.305, 0);
      propTrophy.add(bowl);

      // Rolled golden rim on bowl top
      const geomRim = new THREE.TorusGeometry(0.20, 0.016, 10, 32);
      geomRim.rotateX(Math.PI / 2);
      const rim = new THREE.Mesh(geomRim, matGold);
      rim.position.set(0, 0.415, 0);
      propTrophy.add(rim);

      // Left curved handle
      const geomHandle = new THREE.TorusGeometry(0.10, 0.016, 8, 24, Math.PI * 1.15);
      const handleL = new THREE.Mesh(geomHandle, matGold);
      handleL.position.set(-0.19, 0.31, 0);
      handleL.rotation.z = -Math.PI * 0.58;
      propTrophy.add(handleL);

      // Right curved handle (symmetric mirror)
      const handleR = new THREE.Mesh(geomHandle, matGold);
      handleR.position.set(0.19, 0.31, 0);
      handleR.rotation.z = -Math.PI * 0.58;
      handleR.scale.x = -1;
      propTrophy.add(handleR);

      // Sparkling gem floating inside bowl
      const geomGem = new THREE.OctahedronGeometry(0.065, 0);
      const gem = new THREE.Mesh(geomGem, matGem);
      gem.position.set(0, 0.45, 0);
      propTrophy.add(gem);
    }

    // Item 3: Energy Drink Can (Geek Fuel)
    const propCan = new THREE.Group();
    {
      // Main can body with GEEK FUEL label
      const geomCanBody = new THREE.CylinderGeometry(0.12, 0.12, 0.33, 32, 1, false);
      const canBody = new THREE.Mesh(geomCanBody, matCan);
      propCan.add(canBody);

      // Top shoulder taper
      const geomTopShoulder = new THREE.CylinderGeometry(0.105, 0.12, 0.03, 32);
      const topShoulder = new THREE.Mesh(geomTopShoulder, matCanMetal);
      topShoulder.position.set(0, 0.18, 0);
      propCan.add(topShoulder);

      // Bottom heel taper
      const geomBottomHeel = new THREE.CylinderGeometry(0.12, 0.105, 0.03, 32);
      const bottomHeel = new THREE.Mesh(geomBottomHeel, matCanMetal);
      bottomHeel.position.set(0, -0.18, 0);
      propCan.add(bottomHeel);

      // Top aluminum lid disc
      const geomLid = new THREE.CylinderGeometry(0.105, 0.105, 0.006, 32);
      const canLid = new THREE.Mesh(geomLid, matCanMetal);
      canLid.position.set(0, 0.196, 0);
      propCan.add(canLid);

      // Top rim ring
      const geomTopRim = new THREE.TorusGeometry(0.105, 0.008, 8, 32);
      geomTopRim.rotateX(Math.PI / 2);
      const topRim = new THREE.Mesh(geomTopRim, matCanMetal);
      topRim.position.set(0, 0.198, 0);
      propCan.add(topRim);

      // Bottom rim ring
      const geomBottomRim = new THREE.TorusGeometry(0.105, 0.008, 8, 32);
      geomBottomRim.rotateX(Math.PI / 2);
      const bottomRim = new THREE.Mesh(geomBottomRim, matCanMetal);
      bottomRim.position.set(0, -0.196, 0);
      propCan.add(bottomRim);

      // Pull Tab
      const geomTabPlate = new RoundedBoxGeometry(0.042, 0.004, 0.075, 2, 0.002);
      const tabPlate = new THREE.Mesh(geomTabPlate, matPullTab);
      tabPlate.position.set(0, 0.201, 0.024);
      propCan.add(tabPlate);

      // Pull tab ring
      const geomTabRing = new THREE.TorusGeometry(0.015, 0.004, 6, 16);
      geomTabRing.rotateX(Math.PI / 2);
      const tabRing = new THREE.Mesh(geomTabRing, matPullTab);
      tabRing.position.set(0, 0.203, 0.045);
      propCan.add(tabRing);

      // Tab rivet
      const geomRivet = new THREE.CylinderGeometry(0.006, 0.006, 0.006, 10);
      const rivet = new THREE.Mesh(geomRivet, matCanMetal);
      rivet.position.set(0, 0.202, -0.008);
      propCan.add(rivet);
    }

    logoGroup.add(propLaptop, propTrophy, propCan);

    // --- State & Motion Variables ---
    let progress = 0;
    let targetProgress = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    let playing = false;
    let t = 0;
    let last = 0;
    let baseY = 0.25;
    let baseScale = 1;

    function render() {
      renderer.render(scene, camera);
    }

    function loop(now: number) {
      raf = 0;
      if (reduced || document.hidden) {
        playing = false;
        return;
      }

      const dt = Math.min(Math.max((now - last) / 1000, 0.001), 0.05);
      last = now;
      t += dt;

      // Smooth interpolation for scroll and mouse
      progress += (targetProgress - progress) * 0.12;
      mouse.x += (mouse.tx - mouse.x) * 0.07;
      mouse.y += (mouse.ty - mouse.y) * 0.07;

      // Subtle organic levitation / floating
      const drift = Math.max(0, 1 - progress * 1.5);
      const floatY = Math.sin(t * 1.1) * 0.04 * drift;
      const floatRotY = Math.sin(t * 0.6) * 0.04 * drift;
      const floatRotX = Math.cos(t * 0.45) * 0.025 * drift;
      const floatRotZ = Math.sin(t * 0.35) * 0.012 * drift;

      // 3D rotations combining organic float + interactive mouse tilt
      logoGroup.rotation.y = floatRotY + mouse.x * 0.32 * drift;
      logoGroup.rotation.x = floatRotX - mouse.y * 0.24 * drift - progress * 0.25;
      logoGroup.rotation.z = floatRotZ;

      // Position: sits at baseY + float offset, then recedes smoothly on scroll
      logoGroup.position.y = baseY + floatY - progress * 0.5;
      logoGroup.position.z = -progress * 2.0;

      // Scale: responsive base scale, gently recedes on scroll
      const currentScale = baseScale * (1 - progress * 0.3);
      logoGroup.scale.setScalar(currentScale);

      // Graceful fade into subsequent section
      const opacity = Math.max(0, 1 - progress * 1.6);
      for (const m of materials) {
        m.opacity = opacity;
      }
      key.intensity = 1.15 * opacity;
      fill.intensity = 0.5 * opacity;
      rimTeal.intensity = 0.85 * opacity;
      rimOrange.intensity = 0.75 * opacity;

      // --- Orbital Mechanics for 3 Builder Items Around Logo ---
      // 1. Laptop: Fast inner orbit (~5.0s period, +16° inclination)
      const a1 = t * 1.25;
      const x1 = Math.cos(a1) * 2.55;
      const z1 = Math.sin(a1) * 1.70;
      const y1 = Math.sin(a1) * 0.65 + Math.sin(t * 1.8) * 0.08;
      propLaptop.position.set(x1, y1, z1);
      propLaptop.rotation.y = -Math.atan2(z1, x1) + Math.PI / 2 + Math.sin(t * 0.8) * 0.2;
      propLaptop.rotation.x = 0.35 + Math.sin(t * 1.2) * 0.15;
      propLaptop.rotation.z = Math.cos(t * 1.0) * 0.12;

      // 2. Trophy: Counter-rotating mid orbit (~7.2s period, -20° tilt)
      const a2 = -t * 0.85 + 2.3;
      const x2 = Math.cos(a2) * 2.95;
      const z2 = Math.sin(a2) * 2.05;
      const y2 = -Math.sin(a2) * 0.85 + Math.cos(t * 1.5) * 0.08;
      propTrophy.position.set(x2, y2, z2);
      propTrophy.rotation.y = t * 1.2;
      propTrophy.rotation.z = 0.18 * Math.sin(t * 0.9);
      propTrophy.rotation.x = 0.12 * Math.cos(t * 0.7);

      // 3. Energy Drink Can: Sweeping outer orbit (~9.6s period, +28° steep inclination)
      const a3 = t * 0.62 + 4.4;
      const x3 = Math.cos(a3) * 3.35;
      const z3 = Math.sin(a3) * 2.35;
      const y3 = Math.sin(a3) * 1.15 + Math.sin(t * 1.1) * 0.1;
      propCan.position.set(x3, y3, z3);
      propCan.rotation.x = t * 1.1;
      propCan.rotation.y = t * 0.85;
      propCan.rotation.z = 0.4 + Math.sin(t * 1.4) * 0.2;

      render();

      // Pause rendering once scrolled completely past
      if (progress > 0.995 && targetProgress >= 1) {
        playing = false;
        return;
      }

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

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      mouse.tx = event.clientX / window.innerWidth - 0.5;
      mouse.ty = event.clientY / window.innerHeight - 0.5;
    };

    const onVisibility = () => {
      if (document.hidden) pause();
      else play();
    };

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      // Responsive viewport world size
      const vH = 2 * Math.tan(((FOV / 2) * Math.PI) / 180) * CAM_Z;
      const vW = vH * (w / h);
      const isMobile = w < 768;

      // Logo reference width is ~3.88 world units
      // Mobile: fill ~62% of screen width, placed higher up
      // Desktop: fill ~32% of screen width, balanced above bottom content
      const targetW = isMobile
        ? vW * 0.62
        : Math.min(vW * 0.32, vH * 0.44 * 1.51);

      baseScale = targetW / 3.88;
      baseY = isMobile ? vH * 0.14 : vH * 0.08;

      logoGroup.scale.setScalar(baseScale);
      logoGroup.position.y = baseY;

      if (reduced) {
        logoGroup.rotation.set(0, 0, 0);
        logoGroup.position.set(0, baseY, 0);
        propLaptop.position.set(2.4, 0.45, 0.8);
        propLaptop.rotation.set(0.3, 0.5, -0.1);
        propTrophy.position.set(-2.6, -0.55, -0.4);
        propTrophy.rotation.set(0.1, 0.4, 0);
        propCan.position.set(0.7, 1.45, -1.6);
        propCan.rotation.set(0.6, 0.8, 0.4);
        render();
      }
    };

    resize();

    if (reduced) {
      propLaptop.position.set(2.4, 0.45, 0.8);
      propLaptop.rotation.set(0.3, 0.5, -0.1);
      propTrophy.position.set(-2.6, -0.55, -0.4);
      propTrophy.rotation.set(0.1, 0.4, 0);
      propCan.position.set(0.7, 1.45, -1.6);
      propCan.rotation.set(0.6, 0.8, 0.4);
      render(); // Static frame
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);

      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      // Scroll observer synchronized with hero section exit
      const observer = onScroll({
        target: canvas.closest("section") ?? canvas,
        sync: true,
        enter: "top start",
        leave: "top end",
        onUpdate: (self) => {
          targetProgress = Math.min(1, Math.max(0, self.progress));
          if (targetProgress < 1 && !playing) play();
        },
      });

      play();

      return () => {
        observer.revert();
        ro.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("visibilitychange", onVisibility);
        pause();

        scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            const mat = obj.material;
            if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
            else mat.dispose();
          }
        });
        textureLaptop.dispose();
        textureKeyboard.dispose();
        textureCan.dispose();
        renderer.dispose();
      };
    }
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    />
  );
}
