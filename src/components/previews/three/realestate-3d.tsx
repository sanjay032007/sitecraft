/* eslint-disable @typescript-eslint/no-unused-vars, react-hooks/immutability, react/no-unescaped-entities */
"use client";

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Template } from '@/lib/data';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Sparkles as ThreeSparkles, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Home, MapPin, BedDouble, Bath, Square, Phone, Mail, Sparkles, Compass, ShieldCheck, Check } from 'lucide-react';
import * as THREE from 'three';

// Deterministic pseudo-random helper to avoid hydration mismatches
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Render L-Shaped Floor Slabs
function LFloor({ 
  color, 
  roughness = 0.75, 
  metalness = 0.05, 
  clearcoat = 0.1, 
  clearcoatRoughness = 0.8 
}: { 
  color: string; 
  roughness?: number; 
  metalness?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
}) {
  return (
    <group>
      {/* Wing A */}
      <mesh position={[-0.5, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.05, 3.0]} />
        <meshPhysicalMaterial 
          color={color} 
          roughness={roughness} 
          metalness={metalness} 
          clearcoat={clearcoat} 
          clearcoatRoughness={clearcoatRoughness} 
        />
      </mesh>
      {/* Wing B */}
      <mesh position={[1.25, 0, -0.75]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.05, 1.5]} />
        <meshPhysicalMaterial 
          color={color} 
          roughness={roughness} 
          metalness={metalness} 
          clearcoat={clearcoat} 
          clearcoatRoughness={clearcoatRoughness} 
        />
      </mesh>
    </group>
  );
}

// Highly Detailed L-Shaped Villa Model
function VillaLunaModel({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const scale = isMobile ? 0.55 : 0.85;
  const roofRef = useRef<THREE.Group>(null);
  const floor2Ref = useRef<THREE.Group>(null);
  const floor2WallsRef = useRef<THREE.Group>(null);
  const floor1WallsRef = useRef<THREE.Group>(null);
  const foundationRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const s = scrollProgress.current;

    // 1. Roof lifts straight up and rotates slightly
    if (roofRef.current) {
      const targetY = 1.83 + s * 2.8;
      roofRef.current.position.y = THREE.MathUtils.lerp(roofRef.current.position.y, targetY, 0.08);
      roofRef.current.rotation.y = THREE.MathUtils.lerp(roofRef.current.rotation.y, s * 0.25, 0.08);
    }

    // 2. Floor 2 segment rises and slides slightly
    if (floor2Ref.current) {
      const targetY = 0.68 + s * 1.3;
      floor2Ref.current.position.y = THREE.MathUtils.lerp(floor2Ref.current.position.y, targetY, 0.08);
      
      const targetX = s * 0.45;
      floor2Ref.current.position.x = THREE.MathUtils.lerp(floor2Ref.current.position.x, targetX, 0.08);
    }

    // 3. Floor 2 walls slide outwards relative to Floor 2
    if (floor2WallsRef.current) {
      const rightWall = floor2WallsRef.current.children[0];
      if (rightWall) {
        const targetX = 2.0 + s * 0.7;
        rightWall.position.x = THREE.MathUtils.lerp(rightWall.position.x, targetX, 0.08);
      }
      const backWall = floor2WallsRef.current.children[1];
      if (backWall) {
        const targetZ = -1.5 - s * 0.7;
        backWall.position.z = THREE.MathUtils.lerp(backWall.position.z, targetZ, 0.08);
      }
      const frontGlass = floor2WallsRef.current.children[2];
      if (frontGlass) {
        const targetZ = 1.5 + s * 0.7;
        frontGlass.position.z = THREE.MathUtils.lerp(frontGlass.position.z, targetZ, 0.08);
      }
    }

    // 4. Floor 1 walls slide outwards relative to foundation
    if (floor1WallsRef.current) {
      const leftWall = floor1WallsRef.current.children[0];
      if (leftWall) {
        const targetX = -1.5 - s * 0.7;
        leftWall.position.x = THREE.MathUtils.lerp(leftWall.position.x, targetX, 0.08);
      }
      const backWall = floor1WallsRef.current.children[1];
      if (backWall) {
        const targetZ = -1.5 - s * 0.7;
        backWall.position.z = THREE.MathUtils.lerp(backWall.position.z, targetZ, 0.08);
      }
      const frontGlass = floor1WallsRef.current.children[2];
      if (frontGlass) {
        const targetZ = 1.5 + s * 0.7;
        frontGlass.position.z = THREE.MathUtils.lerp(frontGlass.position.z, targetZ, 0.08);
      }
    }
  });

  return (
    <group scale={scale}>
      {/* 1. LEVEL 0: Foundation & Sub-Ground Landscaping (Static) */}
      <group ref={foundationRef}>
        {/* Ground grass plot */}
        <mesh position={[0, -0.66, 0]} receiveShadow>
          <boxGeometry args={[6.5, 0.22, 6.5]} />
          <meshPhysicalMaterial color="#091814" roughness={0.9} metalness={0.1} />
        </mesh>
        
        {/* Sub-ground basement pool deck */}
        <mesh position={[0, -0.56, 1.8]} receiveShadow>
          <boxGeometry args={[3.2, 0.04, 2.2]} />
          <meshPhysicalMaterial color="#7c2d12" roughness={0.6} metalness={0.1} />
        </mesh>

        {/* Basement pool water */}
        <mesh position={[0, -0.54, 1.8]}>
          <boxGeometry args={[2.8, 0.02, 1.8]} />
          <meshPhysicalMaterial
            color="#0e7490"
            transmission={0.98}
            roughness={0.1}
            ior={1.33}
            transparent={true}
            opacity={0.8}
            clearcoat={1.0}
          />
        </mesh>

        {/* Miniature Deck Chairs by pool */}
        <group position={[0.8, -0.52, 1.2]}>
          <mesh><boxGeometry args={[0.12, 0.04, 0.35]} /><meshStandardMaterial color="#ffffff" /></mesh>
          <mesh position={[0.14, 0, 0]}><boxGeometry args={[0.12, 0.04, 0.35]} /><meshStandardMaterial color="#ffffff" /></mesh>
        </group>

        {/* Level 1 (Ground Floor) Slab */}
        <group position={[0, -0.53, 0]}>
          <LFloor color="#fafaf9" roughness={0.75} metalness={0.05} clearcoat={0.1} clearcoatRoughness={0.8} />
        </group>

        {/* Landscaping Trees (Left & Right) */}
        <group position={[-2.4, -0.5, 2.2]}>
          <mesh position={[0, 0.35, 0]}><cylinderGeometry args={[0.04, 0.04, 0.7, 8]} /><meshStandardMaterial color="#451a03" /></mesh>
          <mesh position={[0, 0.8, 0]}><sphereGeometry args={[0.26, 12, 12]} /><meshStandardMaterial color="#047857" roughness={0.95} /></mesh>
        </group>
        <group position={[2.4, -0.5, -2.2]}>
          <mesh position={[0, 0.35, 0]}><cylinderGeometry args={[0.04, 0.04, 0.7, 8]} /><meshStandardMaterial color="#451a03" /></mesh>
          <mesh position={[0, 0.8, 0]}><sphereGeometry args={[0.24, 12, 12]} /><meshStandardMaterial color="#065f46" roughness={0.95} /></mesh>
        </group>
      </group>

      {/* 2. LEVEL 1: Ground Floor Interior Walls & Furniture */}
      <group ref={floor1WallsRef}>
        {/* Concrete Left Wall */}
        <mesh position={[-1.5, 0.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 1.1, 3.0]} />
          <meshPhysicalMaterial 
            color="#fafaf9" 
            roughness={0.75} 
            metalness={0.05} 
            clearcoat={0.1} 
            clearcoatRoughness={0.8} 
          />
        </mesh>
        {/* Concrete Back Wall */}
        <mesh position={[0.25, 0.05, -1.5]} castShadow receiveShadow>
          <boxGeometry args={[3.5, 1.1, 0.08]} />
          <meshPhysicalMaterial 
            color="#fafaf9" 
            roughness={0.75} 
            metalness={0.05} 
            clearcoat={0.1} 
            clearcoatRoughness={0.8} 
          />
        </mesh>
        {/* Large Front Glass Facade */}
        <mesh position={[-0.5, 0.05, 1.5]}>
          <boxGeometry args={[2.0, 1.1, 0.03]} />
          <meshPhysicalMaterial
            color="#e0f2fe"
            transmission={0.95}
            roughness={0.08}
            ior={1.52}
            thickness={0.15}
            transparent={true}
            opacity={0.3}
          />
        </mesh>

        {/* Modern floating staircase with supporting spine and handrail */}
        <group position={[0.4, 0, -0.45]} rotation={[0, -Math.PI / 2, 0]}>
          {/* Central supporting steel spine stringer */}
          <mesh position={[0, -0.1, -0.24]} rotation={[0.55, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 0.05, 1.6]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.4} />
          </mesh>
          {/* Wooden steps */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={"step-" + i} position={[0, -0.45 + i * 0.11, -0.8 + i * 0.16]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.04, 0.18]} />
              <meshStandardMaterial color="#7c2d12" roughness={0.5} />
            </mesh>
          ))}
          {/* Sleek metal safety handrail on the outer side */}
          <group position={[0.24, 0, 0]}>
            <mesh position={[0, 0.08, -0.2]} rotation={[0.55, 0, 0]} castShadow>
              <cylinderGeometry args={[0.01, 0.01, 1.7, 8]} />
              <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.25} />
            </mesh>
            {/* Vertical support posts */}
            {[0, 2, 4, 6].map((stepIdx) => {
              const yStep = -0.45 + stepIdx * 0.11;
              const zStep = -0.8 + stepIdx * 0.16;
              return (
                <mesh key={"post-" + stepIdx} position={[0, yStep + 0.22, zStep]} castShadow>
                  <cylinderGeometry args={[0.006, 0.006, 0.4, 8]} />
                  <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
                </mesh>
              );
            })}
          </group>
        </group>

        {/* Sofa Set (Living Room) */}
        <group position={[-0.4, -0.38, 0.5]}>
          {/* Main Sofa */}
          <mesh position={[0, 0, 0]} castShadow><boxGeometry args={[0.9, 0.15, 0.45]} /><meshStandardMaterial color="#1e293b" roughness={0.7} /></mesh>
          <mesh position={[0, 0.15, -0.18]} castShadow><boxGeometry args={[0.9, 0.2, 0.08]} /><meshStandardMaterial color="#1e293b" /></mesh>
          {/* Coffee Table */}
          <mesh position={[0, -0.05, 0.45]} castShadow><boxGeometry args={[0.6, 0.08, 0.35]} /><meshStandardMaterial color="#78350f" /></mesh>
        </group>

        {/* Luxury Kitchen Island Counter */}
        <group position={[1.2, -0.32, -1.0]}>
          {/* Cabinet Base */}
          <mesh position={[0, -0.02, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.28, 0.36, 0.68]} />
            <meshPhysicalMaterial color="#1e293b" roughness={0.85} metalness={0.1} />
          </mesh>
          {/* White Marble Countertop */}
          <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.32, 0.04, 0.72]} />
            <meshPhysicalMaterial 
              color="#f8fafc" 
              roughness={0.15} 
              metalness={0.05} 
              clearcoat={1.0} 
              clearcoatRoughness={0.05} 
            />
          </mesh>
          {/* Recessed sink basin */}
          <mesh position={[0, 0.201, 0.12]} castShadow>
            <boxGeometry args={[0.18, 0.002, 0.22]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Designer Faucet */}
          <group position={[0, 0.2, -0.05]}>
            <mesh position={[0, 0.06, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.12, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.06, 8]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>

          {/* Two Modern Bar Stools */}
          {[-0.2, 0.2].map((zOffset, idx) => (
            <group key={"stool-" + idx} position={[-0.24, -0.08, zOffset]}>
              {/* Walnut seat disc */}
              <mesh position={[0, 0.1, 0]} castShadow>
                <cylinderGeometry args={[0.06, 0.06, 0.015, 12]} />
                <meshStandardMaterial color="#7c2d12" roughness={0.4} />
              </mesh>
              {/* Stool legs */}
              <mesh position={[0.02, 0, 0.02]}>
                <cylinderGeometry args={[0.006, 0.006, 0.2, 8]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} />
              </mesh>
              <mesh position={[-0.02, 0, 0.02]}>
                <cylinderGeometry args={[0.006, 0.006, 0.2, 8]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} />
              </mesh>
              <mesh position={[0.02, 0, -0.02]}>
                <cylinderGeometry args={[0.006, 0.006, 0.2, 8]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} />
              </mesh>
              <mesh position={[-0.02, 0, -0.02]}>
                <cylinderGeometry args={[0.006, 0.006, 0.2, 8]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} />
              </mesh>
              {/* Footrest ring */}
              <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.04, 0.004, 6, 12]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* 3. LEVEL 2: Upper Floor Bed, Terrace & Elevated Infinity Pool */}
      <group ref={floor2Ref} position={[0, 0.68, 0]}>
        {/* Floor 2 Slab */}
        <LFloor color="#fafaf9" roughness={0.75} metalness={0.05} clearcoat={0.1} clearcoatRoughness={0.8} />

        {/* Elevated Glass Infinity Pool with Ladder & Lighting */}
        <group position={[-0.5, 0.3, 1.5]}>
          {/* Pool water */}
          <mesh position={[0, -0.1, 0.2]}>
            <boxGeometry args={[1.56, 0.4, 0.94]} />
            <meshPhysicalMaterial
              color="#22d3ee"
              transmission={0.8}
              roughness={0.1}
              ior={1.333}
              transparent={true}
              opacity={0.7}
              clearcoat={1.0}
            />
          </mesh>
          {/* Bottom base slab - perfectly framing the pool */}
          <mesh position={[0, -0.32, 0.2]} receiveShadow>
            <boxGeometry args={[1.68, 0.08, 1.04]} />
            <meshPhysicalMaterial 
              color="#fafaf9" 
              roughness={0.75} 
              metalness={0.05} 
              clearcoat={0.1} 
              clearcoatRoughness={0.8} 
            />
          </mesh>
          {/* Glass perimeter walls - aligned flush on the base slab */}
          <mesh position={[-0.82, -0.1, 0.2]}>
            <boxGeometry args={[0.04, 0.44, 1.0]} />
            <meshPhysicalMaterial color="#ffffff" transmission={0.95} roughness={0.05} thickness={0.08} transparent opacity={0.3} />
          </mesh>
          <mesh position={[0.82, -0.1, 0.2]}>
            <boxGeometry args={[0.04, 0.44, 1.0]} />
            <meshPhysicalMaterial color="#ffffff" transmission={0.95} roughness={0.05} thickness={0.08} transparent opacity={0.3} />
          </mesh>
          <mesh position={[0, -0.1, 0.7]}>
            <boxGeometry args={[1.68, 0.44, 0.04]} />
            <meshPhysicalMaterial color="#ffffff" transmission={0.95} roughness={0.05} thickness={0.08} transparent opacity={0.3} />
          </mesh>

          {/* Stainless Steel Pool Ladder */}
          <group position={[0.6, 0.1, -0.15]} rotation={[0, Math.PI / 2, 0]}>
            <mesh position={[-0.08, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.4, 8]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0.08, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.4, 8]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, -0.05, 0]}>
              <boxGeometry args={[0.16, 0.01, 0.02]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.05, 0]}>
              <boxGeometry args={[0.16, 0.01, 0.02]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.2, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
              <boxGeometry args={[0.18, 0.02, 0.12]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>

          {/* Underwater LED Lights */}
          <pointLight position={[-0.4, -0.05, 0.1]} color="#22d3ee" intensity={0.8} distance={1.2} decay={2} />
          <pointLight position={[0.4, -0.05, 0.1]} color="#22d3ee" intensity={0.8} distance={1.2} decay={2} />
          <mesh position={[-0.6, -0.12, 0.2]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#e0f7fa" />
          </mesh>
          <mesh position={[0.6, -0.12, 0.2]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#e0f7fa" />
          </mesh>
        </group>

        {/* Luxury Minimalist Sun Loungers with Side Table & Drinks */}
        <group position={[0.3, 0.02, 0.6]}>
          {[0, 0.28].map((xOffset, idx) => (
            <group key={"lounger-" + idx} position={[xOffset, 0, 0]}>
              {/* Wooden Lounger Slats Frame */}
              <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.14, 0.02, 0.42]} />
                <meshPhysicalMaterial color="#b45309" roughness={0.4} />
              </mesh>
              {/* Cushion (off-white) with pillow */}
              <mesh position={[0, 0.045, 0.01]} castShadow>
                <boxGeometry args={[0.12, 0.03, 0.38]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.9} />
              </mesh>
              {/* Angled headrest pillow */}
              <mesh position={[0, 0.075, -0.14]} rotation={[-0.2, 0, 0]} castShadow>
                <boxGeometry args={[0.12, 0.03, 0.08]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.9} />
              </mesh>
              {/* Sleek Charcoal Metal Frame Legs */}
              <mesh position={[0, -0.01, -0.16]}><boxGeometry args={[0.13, 0.04, 0.015]} /><meshStandardMaterial color="#1e293b" metalness={0.8} /></mesh>
              <mesh position={[0, -0.01, 0.16]}><boxGeometry args={[0.13, 0.04, 0.015]} /><meshStandardMaterial color="#1e293b" metalness={0.8} /></mesh>
            </group>
          ))}
          {/* Elegant wood side table between loungers */}
          <group position={[0.14, 0.015, -0.05]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.03, 0.08]} />
              <meshPhysicalMaterial color="#b45309" roughness={0.4} />
            </mesh>
            <mesh position={[0, -0.02, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.04, 8]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} />
            </mesh>
            {/* Cocktail glass */}
            <mesh position={[0.02, 0.028, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.025, 8]} />
              <meshPhysicalMaterial color="#ffedd5" transmission={0.9} roughness={0.1} transparent opacity={0.6} />
            </mesh>
            {/* Straw */}
            <mesh position={[0.02, 0.045, 0.004]} rotation={[0.2, 0, 0]}>
              <cylinderGeometry args={[0.0015, 0.0015, 0.025, 4]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
          </group>
        </group>

        {/* Bedroom Furniture */}
        <group position={[1.1, 0.12, -0.8]}>
          {/* Bed base */}
          <mesh castShadow><boxGeometry args={[0.9, 0.16, 1.0]} /><meshStandardMaterial color="#ffffff" roughness={0.9} /></mesh>
          {/* Pillows */}
          <mesh position={[0, 0.1, -0.38]}><boxGeometry args={[0.65, 0.06, 0.2]} /><meshStandardMaterial color="#e2e8f0" /></mesh>
          {/* Secondary soft warm bedroom point light */}
          <pointLight 
            position={[0, 0.5, 0]} 
            color="#fbbf24" 
            intensity={1.2} 
            distance={4.0} 
            decay={2.0} 
            castShadow 
          />
        </group>

        {/* Upper Walls */}
        <group ref={floor2WallsRef}>
          {/* Concrete Right Wall */}
          <mesh position={[2.0, 0.58, -0.75]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 1.1, 1.5]} />
            <meshPhysicalMaterial 
              color="#fafaf9" 
              roughness={0.75} 
              metalness={0.05} 
              clearcoat={0.1} 
              clearcoatRoughness={0.8} 
            />
          </mesh>
          {/* Concrete Back Wall */}
          <mesh position={[0.25, 0.58, -1.5]} castShadow receiveShadow>
            <boxGeometry args={[3.5, 1.1, 0.08]} />
            <meshPhysicalMaterial 
              color="#fafaf9" 
              roughness={0.75} 
              metalness={0.05} 
              clearcoat={0.1} 
              clearcoatRoughness={0.8} 
            />
          </mesh>
          {/* Front Glass Facade */}
          <mesh position={[-0.4, 0.58, 0]}>
            <boxGeometry args={[1.8, 1.1, 0.03]} />
            <meshPhysicalMaterial
              color="#e0f2fe"
              transmission={0.95}
              roughness={0.08}
              ior={1.52}
              thickness={0.15}
              transparent={true}
              opacity={0.3}
            />
          </mesh>
        </group>
      </group>

      {/* 4. LEVEL 3: Roof, Garden & Floating Solar Array */}
      <group ref={roofRef} position={[0, 1.83, 0]}>
        {/* L-Shaped Roof Slab */}
        <LFloor color="#132a22" roughness={0.75} metalness={0.05} clearcoat={0.1} clearcoatRoughness={0.8} />

        {/* Roof Garden (Green Box) */}
        <mesh position={[-0.5, 0.06, 0]} castShadow>
          <boxGeometry args={[1.82, 0.08, 2.82]} />
          <meshStandardMaterial color="#14532d" roughness={0.95} />
        </mesh>

        {/* Skylights (Flat Cyan glass panes) */}
        <mesh position={[1.2, 0.03, -0.75]}>
          <boxGeometry args={[1.2, 0.02, 1.2]} />
          <meshPhysicalMaterial color="#06b6d4" transmission={0.95} roughness={0.05} />
        </mesh>

        {/* Floating Solar Array panels (6 panels) */}
        <group position={[0.5, 0.5, -0.4]} rotation={[0.22, 0, 0.1]}>
          {/* Support framework rods */}
          <mesh position={[0, -0.25, 0]}><cylinderGeometry args={[0.015, 0.015, 0.5, 8]} /><meshStandardMaterial color="#d4af37" metalness={0.9} /></mesh>
          <mesh position={[0.6, -0.25, 0]}><cylinderGeometry args={[0.015, 0.015, 0.5, 8]} /><meshStandardMaterial color="#d4af37" metalness={0.9} /></mesh>
          <mesh position={[-0.6, -0.25, 0]}><cylinderGeometry args={[0.015, 0.015, 0.5, 8]} /><meshStandardMaterial color="#d4af37" metalness={0.9} /></mesh>
          
          {/* Panels grid */}
          <group>
            {[-0.5, 0.5].map((x, xi) => 
              [-0.6, 0, 0.6].map((z, zi) => (
                <mesh key={"solar-" + xi + "-" + zi} position={[x, 0, z]} castShadow>
                  <boxGeometry args={[0.42, 0.015, 0.52]} />
                  <meshPhysicalMaterial 
                    color="#0f172a" 
                    roughness={0.04} 
                    metalness={0.95} 
                    clearcoat={1.0} 
                    clearcoatRoughness={0.02}
                  />
                </mesh>
              ))
            )}
          </group>
        </group>
      </group>

      {/* Warm Ambient interior core lighting */}
      <pointLight position={[0, -0.1, 0]} color="#fbbf24" intensity={2.0} distance={5.5} decay={2.0} castShadow />
    </group>
  );
}

// Camera control tied to scroll
function SceneCamera({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const s = scrollProgress.current;

    // Exploded view orbit camera: orbits around the building.
    const angle = elapsed * 0.12 + s * Math.PI * 0.35;
    const radius = 6.2 + s * 1.5;
    
    const targetX = Math.sin(angle) * radius;
    const targetY = 1.35 + s * 2.75;
    const targetZ = Math.cos(angle) * radius;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

    // Look at center of deconstructed villa
    const targetLookY = 0.45 + s * 0.95;
    camera.lookAt(0, targetLookY, 0);
  });

  return null;
}

export function RealEstate3D({ t }: { t: Template }) {
  const [filterType, setFilterType] = useState<"All" | "Villa" | "Penthouse" | "Loft">("All");
  const [reserved, setReserved] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollHeight - target.clientHeight;
    if (maxScroll > 0) {
      const current = Math.min(1, Math.max(0, target.scrollTop / maxScroll));
      scrollProgress.current = current;
      setScrollPercent(Math.round(current * 100));
    }
  };

  const listings = [
    { id: 1, name: "Sunset Hills Modern Villa", price: "$1,850,000", beds: 4, baths: 4.5, area: "4,200 sqft", type: "Villa" as const, loc: "Los Angeles, CA" },
    { id: 2, name: "Minimalist Waterfront Penthouse", price: "$2,450,000", beds: 3, baths: 3, area: "2,800 sqft", type: "Penthouse" as const, loc: "Miami, FL" },
    { id: 3, name: "Industrial Loft Apartment", price: "$890,000", beds: 2, baths: 2, area: "1,600 sqft", type: "Loft" as const, loc: "Brooklyn, NY" },
    { id: 4, name: "Pacific Heights Mansion", price: "$5,200,000", beds: 5, baths: 6, area: "6,500 sqft", type: "Villa" as const, loc: "San Francisco, CA" }
  ];

  const filteredListings = filterType === "All" ? listings : listings.filter(l => l.type === filterType);

  return (
    <div className="@container w-full h-full relative overflow-hidden bg-[#02100d] text-white">
      {/* 3D Scene Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas frameloop="demand" shadows camera={{ position: [0, 1.5, 6.2], fov: 42 }}>
          {/* Twilight atmosphere particles */}
          <ThreeSparkles 
            color="#10b981" 
            count={80} 
            scale={6.5} 
            size={1.5} 
            speed={0.3} 
            noise={0.6} 
            opacity={0.65} 
          />

          {/* Twilight Ambient Light */}
          <ambientLight color="#1e1b4b" intensity={0.25} />
          
          {/* Twilight Key Directional Light */}
          <directionalLight 
            position={[12, 16, 12]} 
            intensity={2.2} 
            color="#fdba74" 
            castShadow 
            shadow-bias={-0.0002} 
          />
          
          {/* Twilight Fill Directional Light */}
          <directionalLight 
            position={[-8, 6, -8]} 
            intensity={1.0} 
            color="#3b82f6" 
          />

          {/* Contact Shadows below the villa base plane */}
          <ContactShadows 
            position={[0, -0.76, 0]} 
            opacity={0.8} 
            scale={8} 
            blur={2.4} 
            far={1.2} 
          />

          {/* R3F Environment night reflections */}
          <Environment preset="night" />

          {/* Exploded Building model */}
          <VillaLunaModel scrollProgress={scrollProgress} />

          {/* Blueprint grid helper on the ground */}
          <gridHelper args={[20, 20, '#10b981', '#064e3b']} position={[0, -0.77, 0]} />

          <SceneCamera scrollProgress={scrollProgress} />

          {/* Bloom Post Processing */}
          <EffectComposer>
            <Bloom luminanceThreshold={0.55} luminanceSmoothing={0.7} intensity={1.2} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Structural Left Sidebar */}
      <div className="absolute top-0 bottom-0 left-0 w-[80px] border-r border-emerald-950/20 bg-black/40 backdrop-blur-xl hidden @3xl:flex flex-col items-center justify-between py-8 z-30 select-none">
        <span className="text-[10px] tracking-[0.4em] font-serif uppercase text-emerald-500/60 rotate-270 whitespace-nowrap mt-4 font-light">
          A R C H I T E C T U R E
        </span>
        <div className="flex flex-col items-center gap-1.5 font-mono text-[9px] text-emerald-400">
          <span className="border border-emerald-500/30 px-1.5 py-0.5 rounded bg-emerald-950/10">VILLA LUNA</span>
          <span className="text-white/40 text-[7px] mt-1">SCALE 1:200</span>
        </div>
        <div className="flex flex-col items-center gap-1 font-mono text-[8px] text-white/40">
          <span>DISASSEMBLY</span>
          <span className="text-emerald-400 font-bold text-[12px]">{scrollPercent}%</span>
        </div>
      </div>

      {/* Structural Right Sidebar */}
      <div className="absolute top-0 bottom-0 right-0 w-[80px] border-l border-emerald-950/20 bg-black/40 backdrop-blur-xl hidden @3xl:flex flex-col items-center justify-between py-8 z-30 select-none">
        <span className="text-[10px] tracking-[0.4em] font-serif uppercase text-emerald-500/60 rotate-90 whitespace-nowrap mt-4 font-light">
          SPATIAL PROPERTIES
        </span>
        <div className="w-[1px] h-20 bg-emerald-950/20" />
        <span className="text-[8px] tracking-[0.2em] font-mono uppercase text-white/30 rotate-90 whitespace-nowrap mb-4">
          EXPLODED SCHEMATIC
        </span>
      </div>

      {/* Main Interface Overlay */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scrollbar-none pointer-events-auto flex flex-col"
      >
        {/* Header */}
        <header className="px-8 py-5 border-b border-emerald-950/10 flex justify-between items-center bg-black/60 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center gap-2 font-serif font-bold tracking-widest text-base text-emerald-100">
            <Home className="w-5 h-5 text-emerald-500" />
            <span>SPATIAL</span>
          </div>
          <nav className="hidden @md:flex gap-8 text-[9px] uppercase tracking-[0.2em] font-bold text-white/50 font-sans">
            <a href="#about" className="hover:text-emerald-400 transition-colors">Concept</a>
            <a href="#properties" className="hover:text-emerald-400 transition-colors">Listings</a>
            <a href="#tour" className="hover:text-emerald-400 transition-colors">Book Tour</a>
          </nav>
          <a 
            href="#tour" 
            className="text-[9px] font-sans font-bold uppercase tracking-wider px-4 py-2 rounded border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-200 transition-all duration-300"
          >
            Schedule Tour
          </a>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-[90vh] shrink-0 w-full flex flex-col justify-end p-8 @3xl:pl-28 @3xl:pr-28 pointer-events-none">
          <div className="max-w-xl pointer-events-auto mb-16">
            <span className="inline-flex items-center gap-1.5 text-[8px] font-sans font-bold uppercase tracking-[0.2em] border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 px-3.5 py-1.5 rounded-full mb-4 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
              Exploded Schematic Modeling
            </span>
            <h1 className="text-3xl @md:text-5xl font-serif font-light tracking-wider leading-tight mb-3 text-emerald-100">
              Deconstruct Villa Luna.
            </h1>
            <p className="text-xs text-white/60 mb-6 leading-relaxed font-sans font-light">
              Explore property layers mathematically. Scroll down to physically disassemble Tonight's Villa Luna Model, exposing solar arrays, elevated pool, deck, partition concrete panels, and kitchen/living cores.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#properties" 
                className="inline-block text-[9px] font-sans font-bold uppercase tracking-wider px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-950/20 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Browse Listings
              </a>
              <span className="text-[9px] text-emerald-400/80 font-mono tracking-widest animate-bounce">
                ↓ Scroll to explode
              </span>
            </div>
          </div>
        </section>

        {/* Concept / About */}
        <section id="about" className="px-6 py-20 shrink-0 w-full @3xl:pl-28 @3xl:pr-28 border-y border-emerald-950/10 bg-black/80 backdrop-blur-md relative">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-[8px] font-mono tracking-[0.35em] text-emerald-500/60 uppercase block mb-3">
              - Architectural Blueprint -
            </span>
            <h2 className="text-2xl @md:text-3xl font-serif font-light tracking-wide text-emerald-100 mb-6">
              Structural Transparency
            </h2>
            <p className="text-xs text-white/70 leading-relaxed font-light mb-6 font-sans">
              Our spatial listings utilize interactive structural deconstruction to give you perfect insight into building design, volume containment, and material division. No hidden elements: as you scroll, watch the glass facades slide, floor slabs lift, and the roof separate to reveal the interior core design of tonight's modern Villa Luna model.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-emerald-950/20 text-center">
              <div>
                <p className="text-[14px] font-serif font-light text-emerald-400">1:200 Scale</p>
                <p className="text-[7px] font-mono text-white/40 uppercase tracking-widest mt-1">Accuracy Grid</p>
              </div>
              <div>
                <p className="text-[14px] font-serif font-light text-emerald-400">Exploded View</p>
                <p className="text-[7px] font-mono text-white/40 uppercase tracking-widest mt-1">Disassembly</p>
              </div>
              <div>
                <p className="text-[14px] font-serif font-light text-emerald-400">4,200 sqft</p>
                <p className="text-[7px] font-mono text-white/40 uppercase tracking-widest mt-1">Footprint</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Listings */}
        <section id="properties" className="px-6 py-20 shrink-0 w-full @3xl:pl-28 @3xl:pr-28 bg-gradient-to-b from-black/80 to-[#030e0b]/95 backdrop-blur-md">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-center text-[8px] font-mono font-bold uppercase tracking-[0.35em] text-emerald-500/70 mb-4">
              Curated Curations
            </h2>
            <h3 className="text-center text-xl @md:text-3xl font-serif font-light tracking-wider text-emerald-100 mb-10">
              Active Spatial Listings
            </h3>
            
            {/* Filter Tabs */}
            <div className="flex justify-center gap-8 mb-12 border-b border-emerald-950/20 pb-4">
              {(["All", "Villa", "Penthouse", "Loft"] as const).map((tab) => (
                <button 
                  key={tab} 
                  className={"text-[10px] font-sans font-bold uppercase tracking-widest pb-1 transition-all duration-300 " + (filterType === tab ? "text-emerald-400 border-b border-emerald-400" : "text-white/40 hover:text-white")}
                  onClick={() => setFilterType(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredListings.map((list) => (
                <div 
                  key={list.id} 
                  className="border border-emerald-950/15 bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden hover:border-emerald-500/30 hover:bg-black/60 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="h-44 bg-emerald-950/5 relative overflow-hidden flex items-center justify-center border-b border-emerald-950/10">
                    <Home className="w-12 h-12 text-emerald-500/10 group-hover:scale-110 transition-transform duration-500" />
                    <span className="absolute bottom-3 left-3 text-[8px] font-mono bg-black/70 border border-emerald-950/20 text-white px-2 py-0.5 rounded flex items-center gap-1">
                      <MapPin className="w-3 text-emerald-400" /> {list.loc}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[7px] font-mono font-bold uppercase text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 rounded">
                        {list.type}
                      </span>
                      <h4 className="text-xs font-serif text-emerald-100 mt-2.5 line-clamp-1 group-hover:text-emerald-300 transition-colors">
                        {list.name}
                      </h4>
                      <p className="text-xs font-serif font-light text-emerald-400 mt-1">{list.price}</p>
                    </div>
                    
                    {/* Specs */}
                    <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-emerald-950/10 text-[9px] text-white/40 font-mono">
                      <span className="flex items-center gap-0.5"><BedDouble className="w-3 h-3 text-emerald-500/50" /> {list.beds} Beds</span>
                      <span className="flex items-center gap-0.5"><Bath className="w-3 h-3 text-emerald-500/50" /> {list.baths} Beds</span>
                      <span className="flex items-center gap-0.5"><Square className="w-3 h-3 text-emerald-500/50" /> {list.area}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule Tour */}
        <section id="tour" className="px-6 py-20 shrink-0 w-full @3xl:pl-28 @3xl:pr-28 border-t border-emerald-950/10 bg-[#010807] relative z-20 text-center">
          <div className="max-w-xl mx-auto bg-black/50 border border-emerald-950/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
            <h2 className="text-lg font-serif font-light tracking-wider mb-2 text-emerald-100">Schedule a Spatial Tour</h2>
            <p className="text-[10px] text-white/40 mb-8 font-sans font-light">Experience physical deconstruction in person. View blueprints with our master architects.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div>
                <label className="text-[7px] font-mono font-bold uppercase text-white/40 block mb-1.5 tracking-wider">Property</label>
                <select className="w-full text-[10px] border border-emerald-950/30 bg-black/60 rounded-lg p-2.5 text-white outline-none focus:border-emerald-500/50 font-sans">
                  <option className="bg-[#02100d] text-white">Sunset Hills Villa</option>
                  <option className="bg-[#02100d] text-white">Waterfront Penthouse</option>
                  <option className="bg-[#02100d] text-white">Industrial Loft</option>
                  <option className="bg-[#02100d] text-white">Pacific Heights Mansion</option>
                </select>
              </div>
              <div>
                <label className="text-[7px] font-mono font-bold uppercase text-white/40 block mb-1.5 tracking-wider">Date</label>
                <input 
                  type="date" 
                  className="w-full text-[10px] border border-emerald-950/30 bg-black/60 rounded-lg p-2 text-white outline-none focus:border-emerald-500/50 font-sans" 
                  defaultValue="2026-06-25" 
                />
              </div>
              <div className="flex items-end">
                <button 
                  className="w-full text-[10px] font-sans font-bold py-2.5 rounded-lg text-white border border-emerald-500/40 bg-gradient-to-b from-emerald-600/30 to-emerald-700/30 hover:from-emerald-600/50 hover:to-emerald-700/50 hover:border-emerald-400 transition-all duration-300 flex items-center justify-center gap-1.5"
                  onClick={() => setReserved(true)}
                >
                  {reserved ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      Scheduled
                    </>
                  ) : (
                    "Schedule Tour"
                  )}
                </button>
              </div>
            </div>
            {reserved && (
              <div className="mt-6 p-3 bg-green-950/20 border border-green-500/20 rounded-xl flex items-center gap-2.5 justify-center text-[10px] text-green-400 font-sans animate-fade-in">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span>Tour scheduled. A confirmation code has been generated.</span>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-emerald-950/10 bg-[#000403] py-8 px-6 text-[8px] font-mono text-white/30 text-center uppercase tracking-[0.25em] relative z-20">
          &copy; {new Date().getFullYear()} SPATIAL PROPERTIES. ALL RIGHTS RESERVED.
        </footer>
      </div>
    </div>
  );
}
