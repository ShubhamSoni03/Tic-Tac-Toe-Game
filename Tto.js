import { useState, useEffect, useCallback } from 'react';

function TicTacToe() {
  // Feature: Game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isGameActive, setIsGameActive] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, Draw: 0 });
  const [mode, setMode] = useState('PvP'); // Feature: Game mode PvP or AI

  const winner = calculateWinner(board);

  // Feature: Simple AI
  function simpleAI(board) {
    // 1️⃣ AI can win
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        if (calculateWinner(board) === 'O') return i;
        board[i] = null;
      }
    }
    // 2️⃣ Block player
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        if (calculateWinner(board) === 'X') {
          board[i] = null;
          return i;
        }
        board[i] = null;
      }
    }
    // 3️⃣ Pick random
    const emptyCells = board.map((cell, i) => cell === null ? i : null).filter(i => i !== null);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  // Feature: AI move
  useEffect(() => {
    if (mode === 'AI' && !isXNext && isGameActive && !gameOver && !winner) {
      const move = simpleAI(board);
      if (move !== undefined) setTimeout(() => handleClick(move), 500);
    }
  }, [board, isXNext, isGameActive, gameOver, winner, mode]);

  // Feature: Player move
  const handleClick = useCallback((index) => {
    if (board[index] || winner || gameOver || !isGameActive) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }, [board, isXNext, winner, gameOver, isGameActive]);

  // Feature: Reset game
  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setIsGameActive(true);
    setGameOver(false);
  }

  // Feature: Exit game
  function exitGame() {
    setIsGameActive(false);
  }

  // Feature: Draw detection
  function drawgame() {
    return board.every(cell => cell !== null) && !winner;
  }

  // Feature: Update scores safely
  useEffect(() => {
    const isDraw = board.every(cell => cell !== null) && !winner;
    if (winner || isDraw) {
      setGameOver(true);
      setScores(prev => ({
        ...prev,
        [winner ? winner : 'Draw']: prev[winner ? winner : 'Draw'] + 1
      }));
    }
  }, [winner, board]);

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gradient-to-r from-purple-200 via-pink-100 to-yellow-200">
      {/* Feature: Title */}
      <h1 className="text-3xl font-bold mb-6">🎮 Tic Tac Toe</h1>

      {/* Feature: Mode Selection */}
      <div className="mb-6">
        <span className="mr-4 font-semibold">Mode:</span>
        <button
          className={`px-3 py-1 rounded ${mode === 'PvP' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setMode('PvP')}
        >
          PvP
        </button>
        <button
          className={`ml-2 px-3 py-1 rounded ${mode === 'AI' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setMode('AI')}
        >
          Play vs AI
        </button>
      </div>

      {isGameActive ? (
        <div className="flex space-x-12">
          {/* Feature: Board */}
          <div className="grid grid-cols-3 gap-0 border-4 border-gray-700 w-[252px] rounded-lg overflow-hidden">
            {board.map((cell, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`
                  w-24 h-24 text-4xl font-bold flex items-center justify-center
                  ${cell === 'X' ? 'text-red-600' : cell === 'O' ? 'text-blue-600' : 'text-gray-800'}
                  border border-gray-400
                  bg-white hover:bg-gray-100
                `}
              >
                {cell}
              </button>
            ))}
          </div>

          {/* Feature: Scoreboard */}
          <div className="bg-white p-4 rounded-lg shadow-md border-2 border-gray-300">
            <h3 className="text-lg font-semibold mb-3">📊 Scoreboard</h3>
            <p>X Wins: {scores.X}</p>
            <p>O Wins: {scores.O}</p>
            <p>Draws: {scores.Draw}</p>
          </div>
        </div>
      ) : (
        <>
          {/* Feature: Exit Message */}
          <h2 className="text-xl font-semibold text-center mb-4">
            🚪 Game Exited. Thank you for playing!
          </h2>
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Play Again
          </button>
        </>
      )}

      {/* Feature: Game Status & Buttons */}
      {isGameActive && (
        <>
          <h2 className="text-lg font-medium mt-4 mb-4">
            {winner
              ? `🏆 Winner: ${winner}`
              : drawgame()
              ? '🤝 It’s a Draw!'
              : `Next Player: ${isXNext ? 'X' : 'O'}`}
          </h2>

          <div className="flex space-x-4">
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Reset Game
            </button>

            <button
              onClick={resetGame}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Play Again
            </button>

            <button
              onClick={exitGame}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Exit Game
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Feature: Calculate winner
function calculateWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

export default TicTacToe;
