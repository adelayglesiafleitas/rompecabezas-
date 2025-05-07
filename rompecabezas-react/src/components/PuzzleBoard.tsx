import { useState } from "react";
import "./PuzzleBoard.css";

const initialPieces = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);

export default function PuzzleBoard() {
  const [pieces, setPieces] = useState<number[]>(initialPieces);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null) return;
    const newPieces = [...pieces];
    [newPieces[draggedIndex], newPieces[index]] = [newPieces[index], newPieces[draggedIndex]];
    setPieces(newPieces);
    setDraggedIndex(null);
  }; 

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
        >
          {piece}
        </div>
      ))}
    </div>
  );
}
