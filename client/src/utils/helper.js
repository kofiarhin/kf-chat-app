import io from "socket.io-client";

// production socket
// const socket = io.connect("https://kf-chat-app.onrender.com/");

// dev socket
// const socket = io.connect("http://localhost:5000");

const socket = io.connect(
  process.env.REACT_APP_NODE_ENV === "production"
    ? process.env.REACT_APP_SOCKET_IO_URL_PROD
    : process.env.REACT_APP_SOCKET_IO_URL_DEV
);

export { socket };
