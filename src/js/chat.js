"use strict"

const socket = io();

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendBtn = document.querySelector(".send-button");

sendBtn.addEventListener("click",()=>{
    const param = {
        name : nickname.value,
        msg : chatInput.value
    }
    // (채널 id, 보내줄객체)
    socket.emit("chatting", param);

})

socket.on("chatting",(message)=>{
    const li = document.createElement("li");
    li.innerText =`${message.name}님이 - ${message.msg}`;

    chatList.appendChild(li);

})

console.log(socket)