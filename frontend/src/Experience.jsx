import { OrbitControls, Sky } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Canvas } from 'react-three-fiber'
import Model3D from './Model3D'

export default function Experience(props) {
    const cameraSettings = {
        fov: 45,
        near: 0.1,
        far: 200,
        position: [- 2, 0, 4]
    }
    return <>
        <Canvas camera={cameraSettings} style={{ height: '100vh' }}>
            <Perf position="top-right" />
            <OrbitControls makeDefault />
            <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />
            <Sky />
            <Model3D url={props.model} />
        </Canvas>
    </>
}
