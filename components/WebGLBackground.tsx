import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { PageID } from '../App';

interface WebGLProps {
  page: PageID;
}

const WebGLBackground: React.FC<WebGLProps> = ({ page }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Points | null>(null);
  const initialPositionsRef = useRef<Float32Array | null>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const particlesCount = 4000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      posArray[i3] = (Math.random() - 0.5) * 12;
      posArray[i3 + 1] = (Math.random() - 0.5) * 12;
      posArray[i3 + 2] = (Math.random() - 0.5) * 12;

      // Silver and Graphite palette
      const silverShade = 0.3 + Math.random() * 0.4;
      colorArray[i3] = silverShade; // R
      colorArray[i3 + 1] = silverShade; // G
      colorArray[i3 + 2] = silverShade + 0.05; // Slightly blue-silver B

      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    initialPositionsRef.current = new Float32Array(posArray);
    velocitiesRef.current = velocities;

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.012,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    meshRef.current = particlesMesh;
    scene.add(particlesMesh);

    camera.position.z = 5;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Smooth mouse movement
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.1;

      if (meshRef.current && initialPositionsRef.current && velocitiesRef.current) {
        const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
        const initialPos = initialPositionsRef.current;
        const vels = velocitiesRef.current;

        const isContactPage = (window as any).__CURRENT_PAGE__ === 'contact';
        const mouseX = mouseRef.current.x * 6;
        const mouseY = mouseRef.current.y * 4;

        for (let i = 0; i < particlesCount; i++) {
          const i3 = i * 3;
          
          positions[i3] += vels[i3] + Math.sin(time + i) * 0.002;
          positions[i3 + 1] += vels[i3 + 1] + Math.cos(time + i) * 0.002;
          positions[i3 + 2] += vels[i3 + 2];

          if (isContactPage) {
            const dx = mouseX - positions[i3];
            const dy = mouseY - positions[i3 + 1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 4) {
              const force = (4 - dist) * 0.04;
              positions[i3] += dx * force;
              positions[i3 + 1] += dy * force;
              
              const swirlSpeed = 0.15;
              const nextAngle = Math.atan2(dy, dx) + swirlSpeed;
              const swirlX = Math.cos(nextAngle) * dist;
              const swirlY = Math.sin(nextAngle) * dist;
              
              positions[i3] += (swirlX - dx) * 0.1;
              positions[i3 + 1] += (swirlY - dy) * 0.1;
            }
          }

          const dxFromOrigin = positions[i3] - initialPos[i3];
          const dyFromOrigin = positions[i3 + 1] - initialPos[i3 + 1];
          const distToOrigin = Math.sqrt(dxFromOrigin * dxFromOrigin + dyFromOrigin * dyFromOrigin);

          if (distToOrigin > 6) {
            positions[i3] -= dxFromOrigin * 0.02;
            positions[i3 + 1] -= dyFromOrigin * 0.02;
          }
        }

        meshRef.current.geometry.attributes.position.needsUpdate = true;
        meshRef.current.rotation.y += 0.0005;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    (window as any).__CURRENT_PAGE__ = page;
    
    if (!meshRef.current) return;
    
    let color = new THREE.Color(0x888888); // Default Silver/Gray
    switch(page) {
      case 'home': color = new THREE.Color(0x666666); break; 
      case 'about': color = new THREE.Color(0xAAAAAA); break;
      case 'skills': color = new THREE.Color(0x777777); break; 
      case 'projects': color = new THREE.Color(0x444444); break; 
      case 'experience': color = new THREE.Color(0x333333); break; 
      case 'contact': color = new THREE.Color(0xCCCCCC); break; 
    }

    gsap.to((meshRef.current.material as THREE.PointsMaterial).color, {
      r: color.r,
      g: color.g,
      b: color.b,
      duration: 1.5,
      ease: "power2.inOut"
    });

  }, [page]);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
};

export default WebGLBackground;