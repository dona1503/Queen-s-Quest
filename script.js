// Function to create the chessboard
function createBoard(n) {
    const board = document.querySelector('.board');
    board.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    board.innerHTML = '';

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if ((i + j) % 2 === 0) {
                cell.classList.add('white');
            } else {
                cell.classList.add('black');
            }
            board.appendChild(cell);
        }
    }
}

// Function to place queens on the board
function placeQueens(board, n) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerHTML = ''; // Clear previous queens
    });

    for (let i = 0; i < n; i++) {
        const row = board[i];
        const col = row.indexOf(1);
        const queen = document.createElement('img');
        queen.src = 'queen.png'; // Path to your queen image
        queen.classList.add('queen');
        const cellIndex = i * n + col;
        cells[cellIndex].appendChild(queen);
    }
}

// Utility function to check if the queen placement is safe
function isSafe(board, row, col, n) {
    for (let i = 0; i < col; i++)
        if (board[row][i] === 1) return false;

    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j] === 1) return false;

    for (let i = row, j = col; j >= 0 && i < n; i++, j--)
        if (board[i][j] === 1) return false;

    return true;
}

// Recursive utility function to solve N-Queens problem
function solveNQueensUtil(board, col, n) {
    if (col >= n) return true;

    for (let i = 0; i < n; i++) {
        if (isSafe(board, i, col, n)) {
            board[i][col] = 1;
            if (solveNQueensUtil(board, col + 1, n)) return true;
            board[i][col] = 0;
        }
    }

    return false;
}

// Function to solve N-Queens problem
function solveNQueens() {
    const n = parseInt(document.getElementById('nValue').value);
    if (isNaN(n) || n <= 0) {
        alert('Please enter a valid number greater than 0');
        return;
    }

    const board = Array.from({ length: n }, () => Array(n).fill(0));

    if (solveNQueensUtil(board, 0, n)) {
        createBoard(n);
        placeQueens(board, n);
    } else {
        alert('No solution exists for '+n+' Queens in '+n+'x'+n+' chess board!');
    }
}


const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('problemStatementModal');
    const btn = document.getElementById('problemStatementLink');
    const span = document.getElementsByClassName('close-btn')[0];
    const backgroundMusic = document.getElementById('backgroundMusic');
    const javascript = document.getElementById('code-javascript');

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }


    document.getElementById('copyCodeBtn').addEventListener('click', function() {
        // const selectedCode = document.querySelector('input[name="code-lang"]:checked').value;
        const codeToCopy = javascript.textContent;
        navigator.clipboard.writeText(codeToCopy).then(() => {
            alert('Code copied to clipboard!');
        }).catch(err => {
            alert('Failed to copy code: ', err);
        });
    });

    // Initially show Java code
    javascript.style.display = 'block';

    backgroundMusic.play();
});