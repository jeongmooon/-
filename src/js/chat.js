"use strict"

const socket = io();

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendBtn = document.querySelector(".send-button");
const dispalyContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress", (e)=>{
    if(e.keyCode === 13){
        send();
    }
})

function send() {
    const param = {
        name : nickname.value,
        msg : chatInput.value
    }
    // (채널 id, 보내줄객체)
    socket.emit("chatting", param);
    chatInput.value="";
}

sendBtn.addEventListener("click",send)

socket.on("chatting",(message)=>{
    const {name, msg, time} = message;
    const item = new LiModel(name, msg, time);
    item.makeLi();
    dispalyContainer.scrollTo(0, dispalyContainer.scrollHeight);
})

function LiModel(name, msg, time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () =>{
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received")
        const dom  = `<span class="profile">
                            <span class="user">${this.name}</span>
                            <img class="image" src="https://placeimg.com/50/50/any" alt="any">
                        </span>
                        <span class="message">${this.msg}</span>
                        <span class="time">${this.time}</span>`;
        
        li.innerHTML = dom;
        chatList.appendChild(li);
    }
}

console.log(socket)