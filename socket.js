const SocketIo = require('socket.io');

module.exports = (server) => {
    const io = SocketIo(server, {paht:'/socket.io'});

    // 접속한 유저 리스트
    const userList = [];

    // 소켓연결
    io.on('connection',(socket)=>{
        let userId ='';

        const req = socket.request;
        const ip  = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        console.log('새로운접속', ip, socket.id);

        socket.on('disconnect',()=>{
            // 소켓나가기
            socket.leave(userId);

            // userList에서 삭제
            for(let i in userList) {
                if(userList[i].username === userId){
                    userList.splice(i,1);
                };
            }

            io.emit("getUSerList", userList);
            console.log('클라이언트 접속 해제', ip, socket.id);
        });

        // 소켓연결 에러
        socket.on('error', (error)=>{
            console.log(error);
        })

        // 전체채팅
        socket.on('toMessage',(obj)=>{
            if(obj.toUser){
                io.to(obj.toSocketId).emit('fromMessage', obj);
                io.to(socket.id).emit('fromMessage', obj);
            } else {
                io.emit('fromMessage',obj);
            }
        })

        // 들어왔을떄 실행
        socket.on('joinChat', (info)=>{
            userId = info.username;
            info.socketId = socket.id;
            userList.push(info);

            socket.join(info.username);

            io.emit("getUserLIst", userList);
        });        

    });

};