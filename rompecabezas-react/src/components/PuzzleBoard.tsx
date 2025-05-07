import { useState } from "react";
import "./PuzzleBoard.css";


// Variable que define la cantidad de piezas
const cant = 9;

// Generar las piezas dinámicamente en base al valor de 'cant'
const initialPieces = Array.from({ length: cant }, (_, index) => index + 1); // Esto generará un array [1, 2, 3, ..., cant]


// Función para mezclar las piezas usando el algoritmo de Fisher-Yates
const shufflePieces = (pieces: number[]) => {
    const newPieces = [...pieces];
    for (let i = newPieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newPieces[i], newPieces[j]] = [newPieces[j], newPieces[i]]; // Intercambiar
    }
    return newPieces;
};

export default function PuzzleBoard() {
    const [pieces, setPieces] = useState<number[]>(shufflePieces(initialPieces));
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [isSolved, setIsSolved] = useState<boolean>(false); // Estado para saber si el puzzle está resuelto

    // Función para manejar el inicio del arrastre de una pieza
    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    // Función para manejar la caída de una pieza en otra posición
    const handleDrop = (index: number) => {
        if (draggedIndex === null) return;
        const newPieces = [...pieces];
        [newPieces[draggedIndex], newPieces[index]] = [newPieces[index], newPieces[draggedIndex]];
        setPieces(newPieces);
        setDraggedIndex(null);

        // Verificar si el puzzle está resuelto
        checkIfSolved(newPieces);
    };

    // Función para verificar si el puzzle está resuelto
    function checkIfSolved(newPieces: number[]) {
        if (newPieces.every((piece, index) => piece === initialPieces[index])) {
            setIsSolved(true); // Si las piezas están en el orden original, el puzzle está resuelto
        } else {
            setIsSolved(false);
        }
    }

    // Función para calcular la posición de fondo (usada para mostrar la imagen dividida)
    function getBackgroundPosition(index: number): string {
        const size = 100; // Tamaño de cada pieza (igual que en CSS)
        const row = Math.floor(index / 3); // Fila de la pieza
        const col = index % 3; // Columna de la pieza
        return `-${col * size}px -${row * size}px`; // Determina la posición de fondo para cada pieza
    }

    // Función para reiniciar el puzzle
    const resetPuzzle = () => {
        setPieces(shufflePieces(initialPieces)); // Mezcla las piezas de nuevo
        setIsSolved(false); // Resetea el estado del puzzle
    };

    return (<> 
    <div className="board">
        {pieces.map((piece, index) => (
            <div
                key={index}
                className="piece"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
                style={{
                    backgroundImage: 'url("/puzzle.jpg")',
                    backgroundSize: "300px 300px", // Tamaño total de la imagen
                    backgroundPosition: getBackgroundPosition(piece - 1), // Posición de la pieza
                }}
            >
                {/* Ya no mostramos el número, solo la imagen dividida */}
            </div>
        ))}

    </div>{isSolved && (
        <div className="success-message">
            <p>¡Felicidades, lo has resuelto!</p>
            <button onClick={resetPuzzle}>Reiniciar</button>
        </div>
    )}</>

    );
}
