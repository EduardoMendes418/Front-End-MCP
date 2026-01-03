import type React from "react";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

// Cores temáticas para tecnologia/ERP
const colors = {
    primary: "#0ea5e9", // Azul ciano (Sky 500 do Tailwind)
    secondary: "#6366f1", // Indigo (Indigo 500 do Tailwind)
    bg_start: "#0f172a", // Slate 900
    bg_end: "#000000",   // Preto
};

type BackgroundProps = {}

const Background: React.FC<BackgroundProps> = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            // Gradiente de fundo mais profundo
            className="absolute inset-0"
            style={{
                background: `radial-gradient(circle at 50% 50%, ${colors.bg_start}, ${colors.bg_end})`
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 20], fov: 50 }}
                style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
                // Adiciona um leve efeito de névoa para profundidade
                onCreated={({ gl, scene }) => {
                    scene.fog = new THREE.Fog(colors.bg_end, 10, 50);
                    gl.setClearColor(colors.bg_end);
                }}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color={colors.primary} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color={colors.secondary} />

                <NetworkGroup />
            </Canvas>
        </motion.div>
    );
};

type NetworkGroupProps = {}

// Componente que gerencia um grupo de formas
const NetworkGroup: React.FC<NetworkGroupProps> = () => {
    const groupRef = useRef<THREE.Group>(null);
    
    // Cria 30 formas com parâmetros aleatórios
    const shapes = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        // Posição espalhada no espaço
        position: [
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 15
        ] as [number, number, number],
        // Tamanho variado
        scale: Math.random() * 1 + 0.4,
        // Velocidade de rotação única para cada forma
        rotationSpeed: [
            Math.random() * 0.005,
            Math.random() * 0.005,
            Math.random() * 0.005
        ] as [number, number, number],
        // Alterna entre as duas cores principais
        color: Math.random() > 0.5 ? colors.primary : colors.secondary
    }));

    useFrame(() => {
        if (!groupRef.current) return;
        
        // Rotação global lenta do grupo inteiro
        groupRef.current.rotation.y += 0.001;
        groupRef.current.rotation.z += 0.0005;
    });

    return (
        <group ref={groupRef}>
            {shapes.map((shape) => (
                <FloatingShape key={shape.id} {...shape} />
            ))}
            {/* Adiciona algumas partículas sutis ao redor */}
            <SubtleParticles />
        </group>
    );
};

interface FloatingShapeProps {
    position: [number, number, number];
    scale: number;
    rotationSpeed: [number, number, number];
    color: string;
    // No longer needs isInputFocused
}

// Uma forma geométrica individual flutuante
const FloatingShape: React.FC<FloatingShapeProps> = ({ position, scale, rotationSpeed, color }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    
    // Animação individual da forma
    useFrame(() => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x += rotationSpeed[0];
        meshRef.current.rotation.y += rotationSpeed[1];
        meshRef.current.rotation.z += rotationSpeed[2];
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            {/* Icosaedro é uma forma complexa e bonita para tech (parece um D20) */}
            <icosahedronGeometry args={[1, 1]} /> {/* args: [raio, detalhe] */}
            <meshStandardMaterial
                color={color}
                wireframe={true} // O segredo está aqui: modo aramado
                roughness={0.1}
                metalness={0.8}
                emissive={color}
                emissiveIntensity={0.5}
                transparent
                opacity={0.7}
            />
        </mesh>
    );
};

// Reutilizando uma versão simplificada das partículas para dar "ambiente"
const SubtleParticles: React.FC = () => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
        positions[i] = (Math.random() - 0.5) * 40;
    }

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.03} color={colors.primary} transparent opacity={0.4} sizeAttenuation blending={THREE.AdditiveBlending} />
        </points>
    );
};

export default Background;