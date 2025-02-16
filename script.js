console.log("Welcome to Tic Tac Toe");
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let isGameOver = false;

// Asking for player names
let player1 = prompt("Enter Player 1 Name (X):", "");
let player2 = prompt("Enter Player 2 Name (O):", "");
let currentPlayer = player1;
let currentSymbol = "X";

document.querySelector(".info").innerText = "Turn for " + currentPlayer;

// Function to change the turn
function changeTurn() {
    if (currentPlayer === player1) {
        currentPlayer = player2;
        currentSymbol = "O";
    } else {
        currentPlayer = player1;
        currentSymbol = "X";
    }
}

// Function to check for a win
function checkWin() {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];
    
    for (let i = 0; i < wins.length; i++) {
        let [a, b, c, x, y, angle] = wins[i];
        if (
            boxtext[a].innerText !== "" &&
            boxtext[a].innerText === boxtext[b].innerText &&
            boxtext[a].innerText === boxtext[c].innerText
        ) {
            let winner = boxtext[a].innerText === "X" ? player1 : player2;
            document.querySelector('.info').innerText = winner + " Won!";
            isGameOver = true;
            document.querySelector('.imgbox img').style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${x}vw, ${y}vw) rotate(${angle}deg)`;
            document.querySelector(".line").style.width = "20vw";
            return;
        }
    }
}

// Game Logic
let boxes = document.getElementsByClassName("box");
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function () {
        let boxtext = boxes[i].querySelector(".boxtext");
        if (boxtext.innerText === "" && !isGameOver) {
            boxtext.innerText = currentSymbol;
            audioTurn.play();
            checkWin();
            if (!isGameOver) {
                changeTurn();
                document.querySelector(".info").innerText = "Turn for " + currentPlayer;
            }
        }
    });
}

// Reset button functionality
document.getElementById("reset").addEventListener("click", function () {
    let boxtexts = document.querySelectorAll(".boxtext");
    for (let i = 0; i < boxtexts.length; i++) {
        boxtexts[i].innerText = "";
    }
    currentPlayer = player1;
    currentSymbol = "X";
    isGameOver = false;
    document.querySelector(".line").style.width = "0vw";
    document.querySelector(".info").innerText = "Turn for " + currentPlayer;
    document.querySelector('.imgbox img').style.width = "0px";
});
