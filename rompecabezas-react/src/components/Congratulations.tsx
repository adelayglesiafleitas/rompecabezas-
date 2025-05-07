interface CongratulationProps {
    resetPuzzle: () => void;
    isSolved: boolean;
}

function Congratulation({ resetPuzzle, isSolved }: CongratulationProps) {
    return (
        <>
            {isSolved && (
                <div className="success-message">
                    <p>¡Felicidades, lo has resuelto!</p>
                    <button onClick={resetPuzzle}>Reiniciar</button>
                </div>
            )}
        </>
    );
}

export default Congratulation;
