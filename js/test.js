const winner = document.getElementById('winner');
const cells = document.querySelectorAll('.cell');
const turnInfo = document.getElementById('turn-info');
const restartButton = document.getElementById('restart-button');


let players = {
    x: "x",
    o: "o",    
};

let isGameRunning = false;
let currentPlayer = '';
let boardState = Array(9).fill('');
const winLines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];


function startGame() {
    isGameRunning = true;
    cells.forEach(cell => cell.textContent = "");
    winner.textContent = "";
    currentPlayer = players.x;
    turnInfo.textContent = `ходят '${currentPlayer}'`;
};

function initializationGame () {
    cells.forEach(cell => {
        cell.addEventListener('click', clickCell);
    });
    restartButton.addEventListener('click', restartGame);
};

function clickCell() {
    if (!isGameRunning) return;
    if(this.textContent) return;
    this.textContent = currentPlayer;
    const cellIndex = this.dataset.cellIndex;
    boardState[cellIndex] = currentPlayer;
    if(checkGameOver()) {
        return finishGame();
    }
    currentPlayer = (currentPlayer === players.x) ? players.o : players.x;
    turnInfo.textContent = `ходят "${currentPlayer}"`;
};

function checkLine(line) {
     const [a,b,c] = line;

     const cellA = boardState[a];
     const cellB = boardState[b];
     const cellC = boardState[c];

     if ([cellA, cellB, cellC].includes("")){
        return false;
     }
     return cellA === cellB && cellB === cellC;
};

function checkGameOver() {
    for ( const line of winLines) {
        if (checkLine(line)) {
            winner.textContent = `Победили '${currentPlayer}'`;            
            return true;
        }
    }
    if(!boardState.includes("")) {
        winner.textContent = 'Ничья!';
        return true;
    }
};

function finishGame() {
    turnInfo.textContent = '';
    boardState.fill('');
    isGameRunning = false;
};

function restartGame() {
    finishGame();
    startGame();
};

checkGameOver();
initializationGame();
restartGame();
startGame();