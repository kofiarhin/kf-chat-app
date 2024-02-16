const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");

const app = express();
const server = http.createServer(app);

// setup middiewrae

app.use(cors());

const port = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let messages = [];

io.on("connection", (socket) => {
  io.emit("receive_message", messages);

  socket.on("join", (data) => {
    socket.broadcast.emit("new_user", data);
  });

  socket.on("leave", (data) => {
    socket.broadcast.emit("user_left", data);
  });
  socket.on("send_message", (data) => {
    messages.push(data);
    io.emit("receive_message", messages);
  });
});

if (process.env.NODE_ENV == "production") {
  const publicPath = path.resolve(__dirname, ".", "build");
  const filePath = path.join(__dirname, ".", "build", "index.html");
  app.use(express.static(publicPath));

  app.get("*", (req, res) => {
    return res.sendFile(filePath);
  });
}

server.listen(port, () => console.log(`server started: listening on ${port}`));
