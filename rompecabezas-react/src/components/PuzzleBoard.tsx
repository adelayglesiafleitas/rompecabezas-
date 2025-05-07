import { useState } from "react";
import "./PuzzleBoard.css";

// Definir las piezas iniciales (con números para la versión de prueba)
const initialPieces = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);

export default function PuzzleBoard() {
  const [pieces, setPieces] = useState<number[]>(initialPieces);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

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
  };

  // Función para calcular la posición de fondo (usada para mostrar la imagen dividida)
  function getBackgroundPosition(index: number): string {
    const size = 100; // Tamaño de cada pieza (igual que en CSS)
    const row = Math.floor(index / 3); // Fila de la pieza
    const col = index % 3; // Columna de la pieza
    return `-${col * size}px -${row * size}px`; // Determina la posición de fondo para cada pieza
  }

  return (
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
          
        </div>
      ))}
    </div>
  );
}
