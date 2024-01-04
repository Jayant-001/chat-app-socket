const express = require("express");
const { createServer } = require("node:http");
const path = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
    console.log("User is connected");

    socket.on("message", (msg) => {
        socket.broadcast.emit("message", msg);
    });

    socket.on("disconnect", () => {
        console.log("User is disconnected");
    });
});

server.listen(4000, () => {
    console.log("server running at http://localhost:4000");
});
