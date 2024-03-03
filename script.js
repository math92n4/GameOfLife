document.addEventListener('DOMContentLoaded', start);

const GRID_WIDTH = 40;
const GRID_HEIGHT = 30;
const model = [];

function start() {
    drawGame();
    initializeModel();
    startAnimation();
}

function drawGame() {
    const board = document.getElementById('board');
    board.style.setProperty("--GRID_WIDTH", GRID_WIDTH);
    board.innerHTML = ""; // Clear the board before drawing

    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            
            if (readFromCell(row, col) === 1) {
                cell.classList.add('isAlive');
            }
            board.appendChild(cell);
        }
    }
}

function initializeModel() {
    for (let row = 0; row < GRID_HEIGHT; row++) {
        const newRow = [];
        for (let col = 0; col < GRID_WIDTH; col++) {
            newRow[col] = Math.random() < 0.30 ? 1 : 0;
        }
        model[row] = newRow;
    }
}

function drawModel() {
    const newModel = [];
    for (let row = 0; row < GRID_HEIGHT; row++) {
        const newRow = [];
        for (let col = 0; col < GRID_WIDTH; col++) {
            const neighbors = countNeighbours(row, col);
            if (readFromCell(row, col) === 1) {
                newRow[col] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
            } else {
                newRow[col] = (neighbors === 3) ? 1 : 0;
            }
        }
        newModel[row] = newRow;
    }

    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            writeToCell(row, col, newModel[row][col]);
        }
    }
}

function countNeighbours(row, col) {
    let count = 0;
    for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
            if (x !== 0 || y !== 0) {
                count += readFromCell(row + y, col + x);
            }
        }
    }
    return count;
}

function writeToCell(row, col, value) {
    model[row][col] = value;
}

function readFromCell(row, col) {
    return model[row] ? model[row][col] : 0;
}

function startAnimation() {
    setInterval(() => {
        drawModel();
        drawGame();
    }, 500);
}