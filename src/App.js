import { Canvas } from '@react-three/fiber'
import { useGLTF, useTexture, Decal, Environment, OrbitControls, RandomizedLight, AccumulativeShadows } from '@react-three/drei'
import { useControls } from 'leva'

export const App = () => (
  <Canvas shadows camera={{ position: [2, 2, 10], fov: 20 }}>
    <ambientLight intensity={1} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
    <group position={[0.25, -1, 0]}>
      <Bun />
      <AccumulativeShadows temporal frames={100} scale={12} alphaTest={0.8} position={[0, 0.04, 0]}>
        <RandomizedLight amount={8} radius={10} ambient={0.5} position={[2.5, 5, -5]} bias={0.001} />
      </AccumulativeShadows>
    </group>
    <Environment preset="city" background backgroundBlurriness={1} />
    <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
  </Canvas>
)

function Bun(props) {
  const { nodes } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bunny/model.gltf')
  return (
    <mesh castShadow receiveShadow geometry={nodes.bunny.geometry} {...props} dispose={null}>
      <meshStandardMaterial color="black" roughness={0.9} />
      <Sticker url="/Sticjer_1024x1024@2x.png" position={[-0.1, 1.3, 0.55]} rotation={-0.5} scale={0.45} />
      <Sticker url="/Twemoji_1f600.svg.png" position={[0.4, 1, 0.55]} rotation={0} scale={0.3} />
      <Sticker url="/D64aIWkXoAAFI08.png" position={[0, 0.7, 0.85]} rotation={0} scale={0.35} />
      <Sticker url="/three.png" position={[-0.5, 1, 0.7]} rotation={1} scale={0.3} />
      <Sticker url="/Twemoji_1f600.svg.png" position={[-0.1, 1.3, 0]} rotation={-0.5} scale={0.3} />
      <Sticker url="/Sticjer_1024x1024@2x.png" position={[0.4, 1, -0.15]} rotation={0} scale={0.45} />
      <Sticker url="/D64aIWkXoAAFI08.png" position={[0, 0.7, -0.3]} rotation={0} scale={0.35} />
      <Sticker url="/three.png" position={[-0.5, 1, -0.2]} rotation={1} scale={0.2} />
      <Sticker url="/Twemoji_1f600.svg.png" position={[-1, 1.48, 0.6]} rotation={-0.1} scale={0.4} />e
      <Sticker url="/D64aIWkXoAAFI08.png" position={[-1.2, 0.7, 0.3]} rotation={0} scale={0.45} />
    </mesh>
  )
}

function Sticker({ url, ...props }) {
  const { debug } = useControls({ debug: false })
  const emoji = useTexture(url)
  return (
    <Decal debug={debug} {...props}>
      <meshPhysicalMaterial
        transparent
        polygonOffset
        polygonOffsetFactor={-10}
        map={emoji}
        map-flipY={false}
        map-anisotropy={16}
        iridescence={1}
        iridescenceIOR={1}
        iridescenceThicknessRange={[0, 1400]}
        roughness={1}
        clearcoat={0.5}
        metalness={0.75}
        toneMapped={false}
      />
    </Decal>
  )
}
