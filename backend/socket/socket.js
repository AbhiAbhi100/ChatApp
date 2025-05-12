import http from "http"
import express from "express"
import { Server } from "socket.io"

let app = express()

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})
 const userSocketMap ={}
 export const getReceiverSocketId=(receiver)=>{
    return userSocketMap[receiver]
 }
io.on("connection",(socket)=>{
  const userId=socket.handshake.query.userId
  if(userId!=undefined){
    userSocketMap[userId]=socket.id
  }
  io.emit("getOnlineUsers",Object.keys(userSocketMap))

socket.on("disconnect",()=>{
  delete userSocketMap[userId]  
 io.emit("getOnlineUsers",Object.keys(userSocketMap))

})
   
})



export {app,server,io}



/**
 * userSocketMap: Keeps a mapping of userId → socket.id, to track which socket is connected to which user.

getReceiverSocketId: Used later (e.g., in sending private messages).


________
When a user connects:

Their userId is read from the handshake query (?userId=123)

It's stored in the userSocketMap

A list of all currently online users is broadcasted to all clients via "getOnlineUsers"
__________________________________


When a user disconnects:

Their socket ID is removed from userSocketMap

Updated list of online users is broadcast again

--------------------------------__---------------
WebSocket is full-duplex, real-time communication.

Socket.IO simplifies WebSocket usage with fallback options.

You must manage user sessions manually if you're doing authentication through socket queries.

User-to-socket mapping is crucial for private messaging.

Socket.IO emits events: connection, disconnect, custom events like "getOnlineUsers".

 */