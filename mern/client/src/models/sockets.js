import io from "socket.io-client";


export default function connectToSocket(){
    let socket;
    return new Promise(res=>{
      socket = io("http://localhost:5000",{transports : ['websocket']});
      res(socket)
    });
}