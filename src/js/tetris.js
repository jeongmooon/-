// DOM
const playground = document.querySelector(".playground > ul");


// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// variables
let score = 0;
let duration = 500;
let downInterval;

// 무빙을 실행하기전 담아 두는용도
let tempMovingItem;

const BLOCKS = {
    tree : [
        // x,y
        [[2,1],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[2,1],[1,1]],
        [[2,1],[1,2],[1,0],[1,1]],
    ]
}

// 다음 블럭 타입 좌표 넘버 변수
const movingItem = {
    type : "tree",
    direction : 3,
    top : 0,
    left : 3,
}

init();

// Functions
function init(){
    // {...값} 이것은 복사
    tempMovingItem = {...movingItem};
    for(let i=0; i<GAME_ROWS; i++){
        prependNewLine();
    }
    renderBlocks();
}

function prependNewLine(){
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    
    for(let j=0; j<GAME_COLS; j++){
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }

    li.prepend(ul);
    playground.prepend(li);
}

function renderBlocks(moveType=""){
    const {type, direction, top, left} = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");

    movingBlocks.forEach(moving =>{
        moving.classList.remove(type,"moving");
    })

    BLOCKS[type][direction].some(block => {

        const x = block[0] + left;
        const y = block[1] + top;

        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAble = checkEmpty(target);        

        if(isAble){
            target.classList.add(type, "moving");
        } else {
            tempMovingItem = {...movingItem};
            setTimeout(()=>{
                // 이벤트 루프에 예약된 함수가 다실행된후에 스택에 넣어서 넘치지 않음
                renderBlocks();

                if(moveType === "top"){
                    seizeBlock();
                }
                
            },0);
            return true;      
        }
    });
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}

// 내려갈곳이 없으면 새로운 블럭을줌
function seizeBlock(){
    const movingBlocks = document.querySelectorAll(".moving");

    movingBlocks.forEach(moving =>{
        moving.classList.remove("moving");
        moving.classList.add("seized");
    })
    generateNewBlock();
}

function generateNewBlock(){
    movingItem.top =0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = {...movingItem};
    renderBlocks();
}

function checkEmpty(target) {
    if(!target || target.classList.contains("seized")){
        return false;
    }
    return true;
}


function moveBlock(moveType, amount){
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType);
}

function changeDirection(){
    const direction =tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction=0 : tempMovingItem.direction += 1;
    renderBlocks();
}

// event handling
document.addEventListener("keydown", e => {
    switch(e.keyCode){
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 40:
            moveBlock("top", 1);
            break;
        case 38:
            changeDirection();
            break;
        default:
            break;
    }
})