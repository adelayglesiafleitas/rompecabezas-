// PuzzleBoard.tsx
import { usePuzzle } from "../hooks/usePuzzle"; // Importa el hook personalizado
import "./PuzzleBoard.css";

export default function PuzzleBoard() {
    const cant = 9; // Número de piezas
    const {
        pieces,
        handleDragStart,
        handleDrop,
        getBackgroundPosition,
        isSolved,
        resetPuzzle,
    } = usePuzzle(cant);

    return (
        <div className="board">
            {isSolved && (
                <div className="success-message">
                    <p>¡Felicidades, lo has resuelto!</p>
                    <button onClick={resetPuzzle}>Reiniciar</button>
                </div>
            )}
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
        </div>
    );
}
