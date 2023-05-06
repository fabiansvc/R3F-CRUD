import { useGLTF } from "@react-three/drei";

export default function Model3D(props) {
    const gltf = useGLTF(props.url);
    return <primitive object={gltf.scene} />;
}
