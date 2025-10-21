import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreePage() {
	const width = 800;
	const height = 800;

	const mountRef = useRef<HTMLDivElement | null>(null);

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	renderer.setAnimationLoop(animate);

	const geometry = new THREE.BoxGeometry(1, 2, 1);
	const material = new THREE.MeshBasicMaterial({ color: 0xf0ff0f });
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	camera.position.z = 5;

	function animate() {
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		cube.scale.y += Math.sin(cube.scale.y + 0.01);
		cube.scale.z += Math.cos(cube.scale.z + 0.01);

		renderer.render(scene, camera);
	}

	useEffect(() => {
		if (mountRef.current && mountRef.current.children.length < 1) {
			mountRef.current.appendChild(renderer.domElement);
		}
	});

	return <div ref={mountRef} style={{ width: width, height: height }}></div>;
}
