import { usePuzzle } from "../hooks/usePuzzle";
import "./PuzzleBoard.css";
import Congratulations from "./Congratulations";

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
                        backgroundSize: "300px 300px",
                        backgroundPosition: getBackgroundPosition(piece - 1),
                    }}
                >
                    {/* Imagen sin número */}
                </div>
            ))}

            <Congratulations resetPuzzle={resetPuzzle} isSolved={isSolved} />
        </div>
    );
}
