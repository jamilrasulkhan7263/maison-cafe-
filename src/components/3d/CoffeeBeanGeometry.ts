import * as THREE from 'three';

/**
 * Creates a procedural 3D coffee bean geometry:
 * An ellipsoid with a flattened ventral surface and a distinct curved central cleft.
 * Applies vertex colors: Deep Charcoal #263238 on outer shell with soft Mint #8FB4AC
 * inner crease highlights running through the central indentation.
 */
export function createCoffeeBeanGeometry(scale = 1): THREE.BufferGeometry {
  const widthSegments = 24;
  const heightSegments = 16;
  const sphereGeom = new THREE.SphereGeometry(1, widthSegments, heightSegments);
  const position = sphereGeom.attributes.position;
  const v = new THREE.Vector3();

  const colors = new Float32Array(position.count * 3);
  const charcoalColor = new THREE.Color(0x263238); // Deep Charcoal
  const mintHighlightColor = new THREE.Color(0x8FB4AC); // Soft Mint inner crease

  for (let i = 0; i < position.count; i++) {
    v.fromBufferAttribute(position, i);

    // Elongate along Z (length), wider along X, slightly flatter along Y
    v.x *= 0.65;
    v.y *= 0.45;
    v.z *= 0.95;

    let isCrease = false;
    let creaseIntensity = 0;

    // Ventral face crease (when y < 0)
    if (v.y < 0.05) {
      // Flatten ventral side
      v.y *= 0.7;

      // Distance from center line along x
      const distFromCenter = Math.abs(v.x);
      if (distFromCenter < 0.22) {
        isCrease = true;
        // Intensity highest at the center groove line
        creaseIntensity = Math.pow(1 - distFromCenter / 0.22, 1.4);

        // Push inward to create authentic coffee bean groove
        const depth = (0.22 - distFromCenter) * 0.75;
        // Natural curved wave
        const wave = Math.sin(v.z * 3.5) * 0.04;
        v.y += depth;
        v.x += wave;
      }
    } else {
      // Dorsal rounded curve
      v.y *= 1.15;
    }

    // Assign vertex color: Deep Charcoal #263238 with soft Mint #8FB4AC inner crease highlights
    if (isCrease && creaseIntensity > 0) {
      const blendColor = charcoalColor.clone().lerp(mintHighlightColor, creaseIntensity * 0.9);
      colors[i * 3] = blendColor.r;
      colors[i * 3 + 1] = blendColor.g;
      colors[i * 3 + 2] = blendColor.b;
    } else {
      colors[i * 3] = charcoalColor.r;
      colors[i * 3 + 1] = charcoalColor.g;
      colors[i * 3 + 2] = charcoalColor.b;
    }

    // Apply scale
    v.multiplyScalar(scale);
    position.setXYZ(i, v.x, v.y, v.z);
  }

  sphereGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  sphereGeom.computeVertexNormals();
  return sphereGeom;
}
