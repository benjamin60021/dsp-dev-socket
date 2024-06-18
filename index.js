const express = require("express")
const { join } = require("node:path")
const app = express()

app.use("/node_modules", express.static(join(__dirname, "node_modules")))

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"))
})

app.listen(3000)
console.log("http://localhost:3000")
