let gameSeq=[];
let userSeq=[];

let btns=["blue","red","purple","green"];

let started=false;
let level=0;
let maxScore = 0;
let score = 0;

let h2=document.querySelector("h2");

document.addEventListener("keydown",function(){
    if(started== false){
        console.log("Game Started");
        started=true;

        levelUp();
    }
}); 

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(() => {
        btn.classList.remove("gameFlash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq=[];
    level++;
    score=level-1;
    
    h2.innerText=`Level ${level}  | Score: ${score} |  Max Score: ${maxScore}`;

    //choosing random button to flash
    let randIdx= Math.floor(Math.random()*4);
    let randColor= btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if(userSeq[idx]=== gameSeq[idx]){
        if (userSeq.length== gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }else{
        if (level>1) {
            maxScore= Math.max(maxScore, level - 1);
        }
        document.querySelector('body').style.backgroundColor='red';
        setTimeout(() => {
            document.querySelector('body').style.backgroundColor='white';
        }, 150);
        reset();
    }
}

function btnPress(){
    let btn= this; 
    userFlash(btn);

    userColor=btn.getAttribute('id');
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener('click',btnPress);
}

function reset() {
    h2.innerHTML=`Game Over! Your score was: ${score}  | Max Score: ${maxScore} <br> Press any key to restart.`;
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

