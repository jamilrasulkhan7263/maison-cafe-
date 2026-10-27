import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createCoffeeBeanGeometry } from './CoffeeBeanGeometry';

export const BackgroundCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xE2E3E5, 0.024);

    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);

    // Warm & Cool Studio lighting for PBR depth
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xD7CCC8, 0.9); // Warm Oat
    keyLight.position.set(6, 10, 8);
    scene.add(keyLight);

    const mintRimLight = new THREE.DirectionalLight(0x8FB4AC, 0.65); // Soft Mint
    mintRimLight.position.set(-6, -5, -2);
    scene.add(mintRimLight);

    // Master scene group for scroll/parallax transformation
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // --- 1. COFFEE BEAN MESHES (#263238 Charcoal with #8FB4AC Mint Crease) ---
    const beanCount = isSoftwareGl ? 24 : 48;
    const beanGeom = createCoffeeBeanGeometry(0.38);

    // PBR Material with vertexColors enabled to show the soft mint inner crease
    const beanMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.45,
      metalness: 0.12,
    });

    const beanMesh = new THREE.InstancedMesh(beanGeom, beanMat, beanCount);
    beanMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    worldGroup.add(beanMesh);

    interface BeanInstance {
      pos: THREE.Vector3;
      rot: THREE.Euler;
      rotSpeed: THREE.Vector3;
      baseDriftSpeed: number;
      swayFreq: number;
      swayAmp: number;
      scale: number;
      depthFactor: number;
    }

    const beans: BeanInstance[] = [];
    const dummy = new THREE.Object3D();

    for (let i = 0; i < beanCount; i++) {
      const zPos = (Math.random() - 0.5) * 14 - 1;
      const depthFactor = 0.5 + (zPos + 8) / 16; // 0.5 to 1.5 based on depth

      const data: BeanInstance = {
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 24,
          (Math.random() - 0.5) * 20,
          zPos
        ),
        rot: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.014,
          (Math.random() - 0.5) * 0.01
        ),
        baseDriftSpeed: 0.004 + Math.random() * 0.006,
        swayFreq: 0.5 + Math.random() * 0.8,
        swayAmp: 0.15 + Math.random() * 0.25,
        scale: (0.75 + Math.random() * 0.5) * (0.8 + depthFactor * 0.2),
        depthFactor,
      };
      beans.push(data);

      dummy.position.copy(data.pos);
      dummy.rotation.copy(data.rot);
      dummy.scale.setScalar(data.scale);
      dummy.updateMatrix();
      beanMesh.setMatrixAt(i, dummy.matrix);
    }
    beanMesh.instanceMatrix.needsUpdate = true;

    // --- 2. VAPOR / STEAM NODES (Soft radial gradients of Mint rgba(143, 180, 172, 0.35) to transparent) ---
    const createMintSteamTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Soft radial gradient of Mint rgba(143, 180, 172, 0.35) to transparent
        const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, 'rgba(143, 180, 172, 0.35)');
        grad.addColorStop(0.3, 'rgba(143, 180, 172, 0.26)');
        grad.addColorStop(0.65, 'rgba(143, 180, 172, 0.08)');
        grad.addColorStop(1, 'rgba(143, 180, 172, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 128);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const steamTex = createMintSteamTexture();

    const steamNodeCount = isSoftwareGl ? 35 : 75;
    const steamGeom = new THREE.BufferGeometry();
    const steamPos = new Float32Array(steamNodeCount * 3);
    const steamSizes = new Float32Array(steamNodeCount);
    const steamDriftSpeed = new Float32Array(steamNodeCount);
    const steamWiggle = new Float32Array(steamNodeCount);
    const steamDepths = new Float32Array(steamNodeCount);

    for (let i = 0; i < steamNodeCount; i++) {
      steamPos[i * 3] = (Math.random() - 0.5) * 26;
      steamPos[i * 3 + 1] = -12 + Math.random() * 24;
      steamPos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;

      steamSizes[i] = 1.0 + Math.random() * 1.8;
      steamDriftSpeed[i] = 0.012 + Math.random() * 0.02;
      steamWiggle[i] = Math.random() * Math.PI * 2;
      steamDepths[i] = 0.6 + Math.random() * 0.8;
    }

    steamGeom.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));

    const steamMat = new THREE.PointsMaterial({
      size: 1.25,
      map: steamTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const steamPoints = new THREE.Points(steamGeom, steamMat);
    worldGroup.add(steamPoints);

    // --- 3. SCROLL-DRIVEN PHYSICS & PARALLAX TRACKING ---
    let lastScrollY = window.scrollY;
    let targetScrollVelocity = 0;
    let scrollVelocity = 0;
    let scrollProgress = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Accumulate scroll velocity delta (capped to prevent extreme jumps)
      const clampedDelta = Math.max(-80, Math.min(80, delta));
      targetScrollVelocity += clampedDelta * 0.15;

      // Normalized scroll progress across page
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = docHeight > 0 ? currentScrollY / docHeight : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- 4. MOUSE PARALLAX TRACKING ---
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // --- 5. RESIZE HANDLER ---
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // --- 6. 60FPS ANIMATION LOOP WITH INFINITE RECYCLING ---
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

      // Smooth scroll velocity decay
      scrollVelocity += (targetScrollVelocity - scrollVelocity) * 0.14;
      targetScrollVelocity *= 0.88;

      // Smooth mouse parallax damping
      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      // 3D Camera Scroll Effect: Shift camera Y with scroll progress & mouse
      const scrollShiftY = (scrollProgress - 0.5) * 5.0; // deep 3D camera scroll effect
      camera.position.x = mouse.x * 1.6;
      camera.position.y = -mouse.y * 1.2 - scrollShiftY;
      camera.lookAt(0, -scrollShiftY * 0.7, 0);

      // Scroll speed acceleration multiplier
      const scrollSpeedBoost = Math.abs(scrollVelocity) * 0.015;
      const scrollDirection = Math.sign(scrollVelocity) || 0;

      // --- A. UPDATE & RECYCLE COFFEE BEANS ---
      for (let i = 0; i < beanCount; i++) {
        const b = beans[i];

        // Dynamic drift speed accelerated by scroll velocity
        const effectiveSpeed = b.baseDriftSpeed + scrollSpeedBoost * (0.8 + b.depthFactor * 0.4);
        b.pos.y -= effectiveSpeed; // Gentle downward drift
        b.pos.x += Math.sin(time * b.swayFreq + i) * 0.003;

        // Proportional 3D rotation based on scroll delta
        // Scrolling down (scrollVelocity > 0) rotates coffee beans forward around X-axis
        // Scrolling up (scrollVelocity < 0) rotates coffee beans backward
        const scrollRotation = scrollVelocity * 0.0045 * (b.depthFactor);
        b.rot.x += b.rotSpeed.x + scrollRotation;
        b.rot.y += b.rotSpeed.y + scrollRotation * 0.25;
        b.rot.z += b.rotSpeed.z + Math.sin(time * 0.4 + i) * 0.002;

        // Subtle mouse parallax offset per bean layer
        const mouseParallaxX = mouse.x * (b.depthFactor * 0.6);
        const mouseParallaxY = -mouse.y * (b.depthFactor * 0.4);

        // Infinite Loop Recycling System:
        // Reset when moving off-screen
        const topBound = 12;
        const bottomBound = -12;
        const xBound = 15;

        if (b.pos.y < bottomBound) {
          b.pos.y = topBound + Math.random() * 2;
          b.pos.x = (Math.random() - 0.5) * 24;
        } else if (b.pos.y > topBound) {
          b.pos.y = bottomBound - Math.random() * 2;
          b.pos.x = (Math.random() - 0.5) * 24;
        }

        if (b.pos.x < -xBound) b.pos.x = xBound;
        if (b.pos.x > xBound) b.pos.x = -xBound;

        dummy.position.set(
          b.pos.x + mouseParallaxX,
          b.pos.y + mouseParallaxY,
          b.pos.z
        );
        dummy.rotation.copy(b.rot);
        dummy.scale.setScalar(b.scale);
        dummy.updateMatrix();
        beanMesh.setMatrixAt(i, dummy.matrix);
      }
      beanMesh.instanceMatrix.needsUpdate = true;

      // --- B. UPDATE & RECYCLE VAPOR / STEAM NODES ---
      const sPos = steamPos;
      for (let i = 0; i < steamNodeCount; i++) {
        // Steam nodes gently drift UPWARD
        const baseSpeed = steamDriftSpeed[i];
        // Dynamic acceleration on scroll
        const steamBoost = scrollSpeedBoost * 0.8;
        sPos[i * 3 + 1] += baseSpeed + steamBoost;

        // Sinusoidal wave sway
        sPos[i * 3] += Math.sin(time * 1.5 + steamWiggle[i]) * 0.008;

        // Infinite Loop Recycling:
        // When steam rises above top boundary, reset to below bottom
        if (sPos[i * 3 + 1] > 13) {
          sPos[i * 3 + 1] = -13 - Math.random() * 3;
          sPos[i * 3] = (Math.random() - 0.5) * 26;
        } else if (sPos[i * 3 + 1] < -14) {
          sPos[i * 3 + 1] = 12;
        }
      }
      steamGeom.attributes.position.needsUpdate = true;

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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      beanGeom.dispose();
      beanMat.dispose();
      steamGeom.dispose();
      steamMat.dispose();
      steamTex.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      style={{
        backgroundColor: '#E2E3E5', // Body background base color (Misty Slate)
      }}
    />
  );
};
