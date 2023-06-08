import { ThreeEvent } from "@react-three/fiber";
import { useMemo, useState } from "react";

export function GridOfBoxes() {
    return (
        <group>
            {[0, 1, 2, 3, 4, 5, 6, 7].flatMap((rowIx) =>
                [0, 1, 2, 3, 4, 5, 6, 7].map((colIx) => (
                    <GrowableBox
                        key={rowIx + " " + colIx}
                        {...{ rowIx, colIx }}
                    />
                ))
            )}
        </group>
    );
}
const palette = ["#a7c5bd", "#e5ddcb", "#eb7b59", "#cf4647", "#524656"];

function GrowableBox({ rowIx, colIx }: { rowIx: number; colIx: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const [height, setHeight] = useState(1);
    const colour = useMemo(() => pick(palette), []);

    const scale = isHovered ? 0.8 : 0.7;

    function grow() {
        setHeight((p) => p + 0.5);
    }

    function handleClick(event: ThreeEvent<MouseEvent>) {
        if (event.shiftKey) {
            setHeight(0.1);
        } else {
            grow();
        }
    }

    return (
        <mesh
            key={rowIx + " " + colIx}
            position={[colIx, height / 2, rowIx]}
            scale={[scale, height, scale]}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <boxBufferGeometry />
            <meshStandardMaterial color={isHovered ? "hotpink" : colour} />
        </mesh>
    );
}

function pick<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)];
}
