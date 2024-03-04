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
app.use(express.json());

const port = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let messages = [];
let users = [];

io.on("connection", (socket) => {
  io.emit("receive_message", messages);

  socket.on("refresh_user", (username) => {
    const check = users.includes(username);
    if (!check) {
      users.push(username);
    }

    socket.emit("users", users);
  });

  socket.on("check_user", (username) => {
    const checkUser = users.find((user) => user === username);
    socket.emit("check_user", {
      error: checkUser ? true : false,
      message: checkUser ? "user already exist" : "",
    });
  });

  socket.on("join", (username) => {
    users.push(username);
    socket.broadcast.emit("new_user", username);
    io.emit("users", users);
  });

  socket.on("leave", (data) => {
    // remove user from list of users
    users = users.filter((user) => user !== data);
    socket.broadcast.emit("users", users);
    socket.broadcast.emit("user_left", data);
  });

  socket.on("send_message", (data) => {
    messages.push(data);
    io.emit("receive_message", messages);
  });

  socket.on("is_typing", (username) => {
    socket.broadcast.emit("is_typing", username);
  });
});

// routes
app.post("/checkUser", (req, res) => {
  const { username } = req.body;
  const checkUser = users.includes(username);

  return res.json({ message: checkUser });
});

// production code
if (process.env.NODE_ENV == "production") {
  const publicPath = path.resolve(__dirname, ".", "build");
  const filePath = path.join(__dirname, ".", "build", "index.html");
  app.use(express.static(publicPath));

  app.get("*", (req, res) => {
    return res.sendFile(filePath);
  });
}

server.listen(port, () => console.log(`server started: listening on ${port}`));
