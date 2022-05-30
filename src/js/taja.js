const GAME_TIME = 3;
let socre = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterVal;
let words =[];
let checkInterVal;

const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector("word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");

function run() {
    isPlaying =true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText =0;
    timeInterVal = setInterval(countDown,1000);
    checkInterVal = setInterval(checkStatus, 50);
    buttonChange('게임중')
}

init();
function init() {
    getWords();
    wordInput.addEventListener("input",checkMatch);
}

function getWords() {
    words = ['Hello','Banana','Apple','Cherry'];
    buttonChange('게임시작');
}

function checkMatch() {
    if(wordInput.ariaValueMax.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        wordInput.value="";
        if(!isPlaying){
            return;
        }
        socre++;
        scoreDisplay.innerText = socre;
        time = GAME_TIME;
        const randomIdx = Math.floor(Math.random()*words.length);
        wordDisplay.innerText = words[randomIdx];
    };
}

function checkStatus() {
    if(!isPlaying && time === 0){
        buttonChange("게임시작");
        clearInterval(checkInterVal);
    }
}



function countDown(){
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying){
        clearInterval(timeInterVal);
    }
    timeDisplay.innerText = time;
}

function buttonChange(text) {
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
}