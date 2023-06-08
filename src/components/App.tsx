import { Center, OrbitControls, Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { GridOfBoxes } from "./GridOfBoxes";

const fontURL = "/Arvo_Bold.json"; //Font file found in `public` folder

function App() {
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

                <Center>
                    <GridOfBoxes />
                </Center>

                <Center position={[0, 1, -5]}>
                    <Text3D font={fontURL} scale={0.5}>
                        Click grid boxes
                        <meshStandardMaterial color={"skyblue"} />
                    </Text3D>
                </Center>
            </Canvas>
        </div>
    );
}

export default App;
