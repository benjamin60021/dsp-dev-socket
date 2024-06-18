const express = require("express")
const { createServer } = require("node:http")
const { join } = require("node:path")
const { Server } = require("socket.io")

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static(join(__dirname, "utils")))
app.use(express.static(join(__dirname, "node_modules/bootstrap/dist")))

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"))
})

io.on("connection", (socket) => {
  console.log("a user connected")

  socket.on("disconnect", () => {
    console.log("user disconnected")
  })

  socket.on("STyping", () => {
    socket.broadcast.emit("CTyping", "Quelqu'un est en train d'écrire...")
  })

  socket.on("SStopTyping", () => {
    socket.broadcast.emit("CStopTyping")
  })

  socket.on("SMessage", (message) => {
    io.emit("CMessage", { msg: message, id: socket.id })
  })

  socket.on("SMessageSeen", (messageId) => {
    io.emit("CMessageSeen", { messageId, senderId: socket.id })
  })
})

server.listen(5000, () => {
  console.log("server running at http://localhost:5000")
})
