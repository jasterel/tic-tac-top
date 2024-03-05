enum Player {
    None = '',
    X = 'X',
    O = 'O',
}

type Board = Player[];

let currentPlayer: Player = Player.X;
let board: Board = Array(9).fill(Player.None);

const winningCombinations: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function cellClick(index: number) {
    if (board[index] === Player.None) {
        board[index] = currentPlayer;
        renderBoard();
        checkWinner();
        currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
    }
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] !== Player.None &&
            board[a] === board[b] &&
            board[a] === board[c]) {
            alert(`${board[a]} wins!`);
            resetGame();
            return;
        }
    }

    if (!board.includes(Player.None)) {
        alert("It's a draw!");
        resetGame();
    }
}

function resetGame() {
    board = Array(9).fill(Player.None);
    currentPlayer = Player.X;
    renderBoard();
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => cellClick(index));
    });

    const resetButton = document.getElementById('resetBtn');
    resetButton?.addEventListener('click', resetGame);

    renderBoard();
});
