const info = document.querySelector(".info");
const img = document.querySelector(".image img");

const xScore = document.querySelector("#xScore");
const oScore = document.querySelector("#oScore");
const drawScore = document.querySelector("#drawScore");

const resetBtn = document.querySelector("#reset");
const newGameBtn = document.querySelector("#newGame");
const soundBtn = document.querySelector("#soundBtn");

let x = 0;
let o = 0;
let draw = 0;

let soundOn = true;


const wins = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];


function updateScore(){

    xScore.innerText=x;
    oScore.innerText=o;
    drawScore.innerText=draw;

}


function checkWin(){

    for(let [a,b,c] of wins){

        if(
            boxTexts[a].innerText &&
            boxTexts[a].innerText===boxTexts[b].innerText &&
            boxTexts[b].innerText===boxTexts[c].innerText
        ){

            gameOver=true;

            info.innerText=`${boxTexts[a].innerText} Won 🎉`;

            img.style.width="150px";

            [a,b,c].forEach(index=>{

                boxes[index].style.background="#22c55e";

            });

            if(boxTexts[a].innerText==="X"){

                x++;

            }else{

                o++;

            }

            updateScore();

            if(soundOn){
                music.play();
            }

            return true;

        }

    }

    return false;

}

function checkDraw(){

    const filled=[...boxTexts].every(box=>box.innerText!="");

    if(filled && !gameOver){

        draw++;

        updateScore();

        gameOver=true;

        info.innerText="Match Draw 🤝";

    }

}


boxes.forEach((box,index)=>{

    box.addEventListener("click",()=>{

        if(gameOver) return;

        if(boxTexts[index].innerText!="") return;

        boxTexts[index].innerText=turn;

        if(soundOn){

            audioTurn.play();

        }

        if(!checkWin()){

            checkDraw();

        }

        if(!gameOver){

            turn=changeTurn();

            info.innerText=`Turn for ${turn}`;

        }

    });

});



resetBtn.addEventListener("click",()=>{

    boxTexts.forEach(box=>{

        box.innerText="";

    });

    boxes.forEach(box=>{

        box.style.background="transparent";

    });

    gameOver=false;

    turn="X";

    info.innerText="Turn for X";

    img.style.width="0";

    music.pause();

    music.currentTime=0;

});



newGameBtn.addEventListener("click",()=>{

    x=0;
    o=0;
    draw=0;

    updateScore();

    resetBtn.click();

});




soundBtn.addEventListener("click",()=>{

    soundOn=!soundOn;

    soundBtn.innerText=soundOn ? "🔊" : "🔇";

});

