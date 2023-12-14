let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".win-msg");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-game-btn");

let turnO = true;
let mouseClick = 0;
let won = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "X";
            turnO = false;
        }
        else {
            box.innerText = "O";
            turnO = true;
        }
        box.disabled = true;
        mouseClick += 1;
        checkWinner();
        if (mouseClick === 9 && won === false) {
            msg.innerText = "Draw";
            msgContainer.style.display = "block";
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                won = true;
            }
        }
    }
};

function showWinner(winner) {
    msgContainer.style.display = "block";
    msg.innerText = "PLayer " + winner + " Won🥳";
    disableBoxes();
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.style.display = "none";
    mouseClick = 0;
    won = false;

};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);