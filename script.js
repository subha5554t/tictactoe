console.log("Welcome to Tic Tac Toe");

// Initialize game variables
var music = new Audio("music.mp3");
var audioTurn = new Audio("ting.mp3");
var gameover = new Audio("gameover.mp3");
var turn = "X";
var isgameover = false;

// Function to change the turn
function changeTurn() {
    if (turn === "X") {
        return "0";
    } else {
        return "X";
    }
}

// Function to check for a win
function checkWin() {
    var boxtext = document.getElementsByClassName("boxtext");

//     Each sub-array [a, b, c, x, y, angle]:
// a, b, c → Box indices forming a winning line.
// x, y, angle → Used for drawing a winning line.

    var wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135]
    ];

    for (var i = 0; i < wins.length; i++) {
        var winPattern = wins[i];
        var first = boxtext[winPattern[0]].innerText;
        var second = boxtext[winPattern[1]].innerText;
        var third = boxtext[winPattern[2]].innerText;

        if (first !== "" && first === second && first === third) {
            document.querySelector(".info").innerText = first + " Won";
            isgameover = true;

            var imgBox = document.querySelector(".imgbox").getElementsByTagName("img")[0];
            imgBox.style.width = "200px";

            var line = document.querySelector(".line");
            line.style.transform = "translate(" + winPattern[3] + "vw, " + winPattern[4] + "vw) rotate(" + winPattern[5] + "deg)";
            line.style.width = "20vw";

            break;
        }
    }
}

// Game Logic
var boxes = document.getElementsByClassName("box");

for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function () {
        var boxtext = this.querySelector(".boxtext");

        if (boxtext.innerText === "" && !isgameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();

            if (!isgameover) {
                document.querySelector(".info").innerText = "Turn for " + turn;
            }
        }
    });
}

// Add onclick listener to reset button
document.getElementById("reset").addEventListener("click", function () {
    var boxtexts = document.querySelectorAll(".boxtext");

    for (var i = 0; i < boxtexts.length; i++) {
        boxtexts[i].innerText = "";
    }

    turn = "X";
    isgameover = false;

    var line = document.querySelector(".line");
    line.style.width = "0vw";

    document.querySelector(".info").innerText = "Turn for " + turn;

    var imgBox = document.querySelector(".imgbox").getElementsByTagName("img")[0];
    imgBox.style.width = "0px";
});
