import { Center, Float, OrbitControls, Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import "./App.css";
import { My3DSubmarineModel } from "./My3DSubmarineModel";

const fontURL = "/Arvo_Bold.json"; //Font file found in `public` folder

/** A component demo'ing some react-three-fiber basics. */
function App() {
    /** Rotation, counted in 16ths of a full rotation, from 0 to 15.  */
    const [rotationAmount, setRotationAmount] = useState(0);

    function handleBoxClick() {
        setRotationAmount((prev) => (prev + 1) % 16);
    }

    return (
        <div className="App">
            <Canvas>
                {/* OrbitControls lets you rotate the camera with the mouse */}
                <OrbitControls autoRotate={false} />

                {/* Red = x, Green = y, Blue = z.  Out from the centre is positive.  */}
                <axesHelper scale={2} />

                {/* A grid with unit markers, on the x-z plane.  */}
                <gridHelper position={[0, -3, 0]} />

                {/* A white light that shines from the top front, 
                and a turqouise one that shines from the bottom */}
                <pointLight position={[10, 10, 10]} />
                <pointLight position={[2, -10, 4]} color={"#008080"} />
                <Center position={[0, 2, 0]}>
                    <Text3D font={fontURL} scale={0.5}>
                        Hello World
                        <meshStandardMaterial color={"skyblue"} />
                    </Text3D>
                </Center>
                {/* A floaty submarine model, which can be rotated */}
                {/* If the rotation property looks worryingly complex to you - just delete it! */}
                <Float
                    rotation={[0, -(rotationAmount * Math.PI) / 8, 0]}
                    position={[0, -2, 0]}
                >
                    <My3DSubmarineModel />
                </Float>
                {/* a box you can click on */}
                <mesh position={[4, 0, 0]} onClick={handleBoxClick}>
                    <boxBufferGeometry />
                    <meshStandardMaterial color={"beige"} />
                </mesh>
            </Canvas>
        </div>
    );
}

// useGLTF.preload("/submarine.glb"); //Not a hook

export default App;
