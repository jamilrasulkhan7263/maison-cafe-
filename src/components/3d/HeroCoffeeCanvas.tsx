import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RotateCcw, Eye, Sparkles, Compass } from 'lucide-react';

/**
 * Procedural Latte Art Canvas Texture
 * Generates an authentic artisanal tulip/heart rosette latte art on rich crema
 */
function createLatteArtTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // 1. Rich Crema gradient base
    const radial = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
    radial.addColorStop(0, '#7A4723'); // Warm hazelnut crema
    radial.addColorStop(0.65, '#563116'); // Deep roasted espresso
    radial.addColorStop(0.92, '#3E200C'); // Dark rim ring
    radial.addColorStop(1.0, '#2C1608');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, 512, 512);

    // Subtle micro-foam bubbles texture
    for (let i = 0; i < 400; i++) {
      const bx = Math.random() * 512;
      const by = Math.random() * 512;
      const dist = Math.hypot(bx - 256, by - 256);
      if (dist < 240) {
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(215, 175, 130, 0.08)' : 'rgba(80, 40, 15, 0.08)';
        ctx.beginPath();
        ctx.arc(bx, by, 1 + Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 2. Barista Milk Foam: Multi-tier Tulip / Rosette Pour
    ctx.save();
    ctx.translate(256, 256);

    const drawFoamLeaf = (y: number, scaleX: number, scaleY: number, alpha: number) => {
      ctx.fillStyle = `rgba(255, 248, 238, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(0, y - 25 * scaleY);
      ctx.bezierCurveTo(45 * scaleX, y - 10 * scaleY, 50 * scaleX, y + 25 * scaleY, 0, y + 40 * scaleY);
      ctx.bezierCurveTo(-50 * scaleX, y + 25 * scaleY, -45 * scaleX, y - 10 * scaleY, 0, y - 25 * scaleY);
      ctx.fill();

      // Soft milk-feathering edge
      ctx.strokeStyle = `rgba(225, 195, 160, ${alpha * 0.5})`;
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    // Outer larger petals
    drawFoamLeaf(65, 1.45, 1.15, 0.95);
    drawFoamLeaf(25, 1.25, 1.05, 0.96);
    drawFoamLeaf(-15, 1.05, 0.95, 0.97);
    drawFoamLeaf(-55, 0.85, 0.85, 0.98);
    // Heart crown topper
    drawFoamLeaf(-95, 0.65, 0.7, 0.99);

    // Cut-through drag line (barista pour finish line)
    ctx.beginPath();
    ctx.moveTo(0, -115);
    ctx.lineTo(0, 115);
    ctx.strokeStyle = 'rgba(110, 60, 25, 0.75)';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural French Croissant / Artisanal Viennoiserie
 */
function createCroissantMesh(): THREE.Group {
  const group = new THREE.Group();

  const croissantMat = new THREE.MeshStandardMaterial({
    color: 0xD99A4E,
    roughness: 0.8,
    metalness: 0.05,
  });

  const crustMat = new THREE.MeshStandardMaterial({
    color: 0xA35B1D,
    roughness: 0.7,
    metalness: 0.08,
  });

  // Layered segmented torus-curved body
  const segmentCount = 14;
  for (let i = 0; i < segmentCount; i++) {
    const t = i / (segmentCount - 1);
    const angle = (t - 0.5) * Math.PI * 0.72; // Crescent curve
    const radius = 1.35;
    const x = Math.sin(angle) * radius;
    const z = (Math.cos(angle) - 0.7) * radius;

    // Fat center, tapered tips
    const bulge = Math.sin(t * Math.PI);
    const segRadius = 0.12 + bulge * 0.38;

    const segGeom = new THREE.CylinderGeometry(segRadius, segRadius * 1.05, 0.22, 16);
    const segMesh = new THREE.Mesh(segGeom, i % 2 === 0 ? croissantMat : crustMat);
    segMesh.position.set(x, 0, z);
    segMesh.rotation.y = angle;
    segMesh.rotation.z = Math.PI / 2;
    segMesh.scale.set(1, 1.25, 0.85); // Flattened oval cross-section
    group.add(segMesh);
  }

  // Flaky tip points
  const tipGeom = new THREE.ConeGeometry(0.12, 0.35, 12);
  const leftTip = new THREE.Mesh(tipGeom, crustMat);
  leftTip.position.set(-1.18, 0, 0.45);
  leftTip.rotation.set(0, 0.6, Math.PI / 2);
  group.add(leftTip);

  const rightTip = new THREE.Mesh(tipGeom, crustMat);
  rightTip.position.set(1.18, 0, 0.45);
  rightTip.rotation.set(0, -0.6, -Math.PI / 2);
  group.add(rightTip);

  return group;
}

export const HeroCoffeeCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [steamActive, setSteamActive] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<'angle' | 'top' | 'pastry'>('angle');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = containerRef.current.clientWidth || 550;
    const height = containerRef.current.clientHeight || 550;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xE2E3E5, 0.025);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 6.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    containerRef.current.appendChild(renderer.domElement);

    // Setup RoomEnvironment reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio 3-point lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xFFF3E0, 1.8);
    keyLight.position.set(5, 8, 4);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8FB4AC, 0.85); // Mint fill
    fillLight.position.set(-6, 3, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xD7CCC8, 1.1); // Warm oat rim
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    // Main Artisan Table Ensemble (Group)
    const ensembleGroup = new THREE.Group();
    ensembleGroup.position.set(0, -0.6, 0);
    scene.add(ensembleGroup);

    // --- 1. CERAMIC CUP & SAUCER ---
    const ceramicMat = new THREE.MeshPhysicalMaterial({
      color: 0xF3F2EF, // Off-white artisanal stoneware
      roughness: 0.18,
      metalness: 0.05,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1,
    });

    const saucerGroup = new THREE.Group();

    // Saucer Base
    const saucerShape = new THREE.CylinderGeometry(2.1, 1.4, 0.18, 48);
    const saucerMesh = new THREE.Mesh(saucerShape, ceramicMat);
    saucerMesh.position.y = 0.09;
    saucerMesh.castShadow = true;
    saucerMesh.receiveShadow = true;
    saucerGroup.add(saucerMesh);

    // Saucer Rim Bevel
    const rimTorus = new THREE.TorusGeometry(2.05, 0.08, 16, 48);
    rimTorus.rotateX(Math.PI / 2);
    const rimMesh = new THREE.Mesh(rimTorus, ceramicMat);
    rimMesh.position.y = 0.18;
    saucerGroup.add(rimMesh);

    // Subtle mint bottom accent band on saucer
    const mintRingMat = new THREE.MeshStandardMaterial({
      color: 0x8FB4AC,
      roughness: 0.3,
      metalness: 0.1,
    });
    const accentRing = new THREE.TorusGeometry(1.42, 0.02, 12, 40);
    accentRing.rotateX(Math.PI / 2);
    const accentMesh = new THREE.Mesh(accentRing, mintRingMat);
    accentMesh.position.y = 0.02;
    saucerGroup.add(accentMesh);

    ensembleGroup.add(saucerGroup);

    // Cup Group
    const cupGroup = new THREE.Group();
    cupGroup.position.set(-0.35, 0.18, 0.1);

    // Cup Exterior Body (Lathe / Tapered Cylinder)
    const cupOuter = new THREE.CylinderGeometry(1.28, 0.88, 1.5, 48, 1, true);
    const cupOuterMesh = new THREE.Mesh(cupOuter, ceramicMat);
    cupOuterMesh.position.y = 0.75;
    cupOuterMesh.castShadow = true;
    cupOuterMesh.receiveShadow = true;
    cupGroup.add(cupOuterMesh);

    // Cup Interior Wall
    const cupInner = new THREE.CylinderGeometry(1.22, 0.82, 1.46, 48, 1, true);
    const cupInnerMesh = new THREE.Mesh(cupInner, ceramicMat);
    cupInnerMesh.position.y = 0.77;
    cupGroup.add(cupInnerMesh);

    // Cup Bottom Solid
    const cupBottom = new THREE.CylinderGeometry(0.88, 0.88, 0.08, 48);
    const cupBottomMesh = new THREE.Mesh(cupBottom, ceramicMat);
    cupBottomMesh.position.y = 0.04;
    cupGroup.add(cupBottomMesh);

    // Cup Beveled Lip
    const cupLip = new THREE.TorusGeometry(1.25, 0.04, 16, 48);
    cupLip.rotateX(Math.PI / 2);
    const cupLipMesh = new THREE.Mesh(cupLip, ceramicMat);
    cupLipMesh.position.y = 1.5;
    cupGroup.add(cupLipMesh);

    // Cup Handle (Curved Torus Segment)
    const handleGeom = new THREE.TorusGeometry(0.55, 0.11, 16, 32, Math.PI * 0.95);
    const handleMesh = new THREE.Mesh(handleGeom, ceramicMat);
    handleMesh.position.set(1.35, 0.82, 0);
    handleMesh.rotation.set(0, 0, -Math.PI / 2.3);
    handleMesh.castShadow = true;
    cupGroup.add(handleMesh);

    // --- 2. LIQUID LATTE ART SURFACE ---
    const latteArtTex = createLatteArtTexture();
    const latteGeom = new THREE.CircleGeometry(1.21, 48);
    latteGeom.rotateX(-Math.PI / 2);
    const latteMat = new THREE.MeshStandardMaterial({
      map: latteArtTex,
      roughness: 0.35,
      metalness: 0.08,
    });
    const latteMesh = new THREE.Mesh(latteGeom, latteMat);
    latteMesh.position.y = 1.41;
    latteMesh.rotation.y = -Math.PI / 4;
    cupGroup.add(latteMesh);

    ensembleGroup.add(cupGroup);

    // --- 3. STEAM PARTICLES FROM CUP ---
    const steamParticleCount = 45;
    const steamGeom = new THREE.BufferGeometry();
    const steamPos = new Float32Array(steamParticleCount * 3);
    const steamSpeed = new Float32Array(steamParticleCount);
    const steamWiggle = new Float32Array(steamParticleCount);

    for (let i = 0; i < steamParticleCount; i++) {
      steamPos[i * 3] = (Math.random() - 0.5) * 0.8;
      steamPos[i * 3 + 1] = 1.5 + Math.random() * 2.5;
      steamPos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      steamSpeed[i] = 0.012 + Math.random() * 0.02;
      steamWiggle[i] = Math.random() * Math.PI * 2;
    }
    steamGeom.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));

    // Circular soft steam sprite
    const createSteamSprite = () => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      if (ctx) {
        const rad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        rad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        rad.addColorStop(0.4, 'rgba(235, 230, 225, 0.4)');
        rad.addColorStop(1, 'rgba(235, 230, 225, 0)');
        ctx.fillStyle = rad;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(c);
    };

    const steamTex = createSteamSprite();
    const steamMat = new THREE.PointsMaterial({
      size: 0.35,
      map: steamTex,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const steamPoints = new THREE.Points(steamGeom, steamMat);
    steamPoints.position.copy(cupGroup.position);
    ensembleGroup.add(steamPoints);

    // --- 4. FLOATING ARTISANAL PASTRY (Croissant) ---
    const pastryGroup = createCroissantMesh();
    pastryGroup.scale.setScalar(0.72);
    pastryGroup.position.set(1.9, 0.75, -0.2);
    pastryGroup.rotation.set(0.35, -0.6, 0.2);
    pastryGroup.castShadow = true;
    ensembleGroup.add(pastryGroup);

    // --- 5. CONTACT SHADOW GROUNDING PLANE ---
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 20, 128, 128, 120);
      grad.addColorStop(0, 'rgba(38, 50, 56, 0.55)');
      grad.addColorStop(0.5, 'rgba(38, 50, 56, 0.2)');
      grad.addColorStop(1, 'rgba(38, 50, 56, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(6.5, 6.5),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.01;
    ensembleGroup.add(shadowPlane);

    // --- ORBIT CONTROLS ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3.2;
    controls.maxDistance = 11;
    controls.maxPolarAngle = Math.PI / 2.05; // Prevent dipping below ground
    controls.target.set(0, 0.4, 0);
    controlsRef.current = controls;

    setIsLoaded(true);

    // Resize listener
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Render loop with software WebGL support
    let animId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          animId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          animId = window.setTimeout(cb, 80);
        }
      };
      animId = window.setTimeout(poll, 5);
    }

    const animate = () => {
      const time = clock.getElapsedTime();

      // Floating gentle pastry hover
      pastryGroup.position.y = 0.75 + Math.sin(time * 1.8) * 0.1;
      pastryGroup.rotation.y = -0.6 + Math.sin(time * 0.8) * 0.15;
      pastryGroup.rotation.z = 0.2 + Math.cos(time * 1.2) * 0.08;

      // Animate Steam particles
      if (steamActive) {
        steamPoints.visible = true;
        const pos = steamGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < steamParticleCount; i++) {
          pos[i * 3 + 1] += steamSpeed[i];
          pos[i * 3] += Math.sin(time * 3 + steamWiggle[i]) * 0.006;

          if (pos[i * 3 + 1] > 3.8) {
            pos[i * 3 + 1] = 1.45;
            pos[i * 3] = (Math.random() - 0.5) * 0.6;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
          }
        }
        steamGeom.attributes.position.needsUpdate = true;
      } else {
        steamPoints.visible = false;
      }

      // Auto rotation
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.0;

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        animId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(animId);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      latteArtTex.dispose();
      steamTex.dispose();
      shadowTex.dispose();
    };
  }, [steamActive, autoRotate]);

  // Camera presets
  const setCameraView = (view: 'angle' | 'top' | 'pastry') => {
    setCurrentView(view);
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (view === 'angle') {
      camera.position.set(0, 3.8, 6.2);
      controls.target.set(0, 0.4, 0);
    } else if (view === 'top') {
      camera.position.set(-0.35, 6.5, 0.12);
      controls.target.set(-0.35, 1.4, 0.1);
    } else if (view === 'pastry') {
      camera.position.set(2.4, 2.2, 2.8);
      controls.target.set(1.9, 0.8, -0.2);
    }
    controls.update();
  };

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] rounded-3xl overflow-hidden glass-card shadow-2xl border border-white/80 group">
      {/* 3D Canvas mount */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#E2E3E5]/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#263238] font-tech font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8FB4AC] animate-ping" />
            Loading 3D Roastery Canvas...
          </div>
        </div>
      )}

      {/* Subtle interaction tip overlay (top-left) */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="glass-pill px-3 py-1.5 rounded-full flex items-center gap-2 text-[11px] font-tech text-[#263238]/80 shadow-sm border border-white/70">
          <Compass className="w-3.5 h-3.5 text-[#8FB4AC]" />
          <span>Interactive 3D | Drag to rotate</span>
        </div>
      </div>

      {/* Modern Collapsible Bottom Dock (Zero Viewport Occlusion) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[460px] z-10">
        <div className="glass-panel px-3.5 py-2.5 rounded-2xl flex items-center justify-between gap-2 shadow-lg border border-white/80">
          {/* View presets */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCameraView('angle')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                currentView === 'angle'
                  ? 'bg-[#8FB4AC] text-white shadow-sm font-semibold'
                  : 'text-[#263238]/70 hover:bg-white/50'
              }`}
              title="Overview perspective"
            >
              Ensemble
            </button>
            <button
              onClick={() => setCameraView('top')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                currentView === 'top'
                  ? 'bg-[#8FB4AC] text-white shadow-sm font-semibold'
                  : 'text-[#263238]/70 hover:bg-white/50'
              }`}
              title="Top view for latte art"
            >
              Latte Art
            </button>
            <button
              onClick={() => setCameraView('pastry')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                currentView === 'pastry'
                  ? 'bg-[#8FB4AC] text-white shadow-sm font-semibold'
                  : 'text-[#263238]/70 hover:bg-white/50'
              }`}
              title="Close up on Viennoiserie"
            >
              Croissant
            </button>
          </div>

          {/* Quick action buttons */}
          <div className="flex items-center gap-1.5 border-l border-[#263238]/10 pl-2">
            <button
              onClick={() => setSteamActive(!steamActive)}
              className={`p-1.5 rounded-lg transition-colors ${
                steamActive
                  ? 'bg-[#8FB4AC]/20 text-[#263238]'
                  : 'text-[#263238]/40 hover:bg-white/50'
              }`}
              title={steamActive ? 'Turn off steam' : 'Turn on steam'}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-1.5 rounded-lg transition-colors ${
                autoRotate
                  ? 'bg-[#8FB4AC]/20 text-[#263238]'
                  : 'text-[#263238]/40 hover:bg-white/50'
              }`}
              title={autoRotate ? 'Pause auto-rotation' : 'Start auto-rotation'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
