const express = require("express")
const {Server: HttpServer} = require("http")
const {Server: IOServer} = require("socket.io")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const messages = []

app.use(express.static("./public"))


io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado")
    socket.emit('messages', messages)

    socket.on('new-message', data => {
        messages.push(data);
        io.sockets.emit("messages", messages)
    })
})

httpServer.listen(3000, () => console.log("Server ON"))