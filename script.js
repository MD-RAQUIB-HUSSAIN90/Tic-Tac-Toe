const music = new Audio("music.mp3");
const audioTurn = new Audio("ting.mp3");

let turn = "X";
let gameOver = false;

const info = document.querySelector(".info");
const img = document.querySelector(".image img");
const boxes = document.querySelectorAll(".box");
const boxTexts = document.querySelectorAll(".boxtext");
const resetBtn = document.querySelector("#reset");

const wins = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const changeTurn = () => (turn === "X" ? "O" : "X");

function checkWin() {
  wins.forEach(([a, b, c]) => {
    if (
      boxTexts[a].innerText &&
      boxTexts[a].innerText === boxTexts[b].innerText &&
      boxTexts[b].innerText === boxTexts[c].innerText
    ) {
      info.innerText = `${boxTexts[a].innerText} Won 🎉`;
      gameOver = true;
      img.style.width = "100px";
      music.play();
    }
  });
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    const boxText = box.querySelector(".boxtext");

    if (boxText.innerText || gameOver) return;

    boxText.innerText = turn;
    audioTurn.play();

    checkWin();

    if (!gameOver) {
      turn = changeTurn();
      info.innerText = `Turn for ${turn}`;
    }
  });
});

resetBtn.addEventListener("click", () => {
  boxTexts.forEach((box) => (box.innerText = ""));

  turn = "X";
  gameOver = false;

  info.innerText = `Turn for ${turn}`;
  img.style.width = "0";

  music.pause();
  music.currentTime = 0;
});
