import io from "socket.io-client";

// production socket
// const socket = io.connect("https://kf-chat-app.onrender.com/");

// devevlopment socket
const socket = io.connect("http://localhost:5000");

export { socket };
