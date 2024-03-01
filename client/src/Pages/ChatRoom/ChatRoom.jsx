import "./chatRoom.styles.scss";
import { socket } from "../../utils/helper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageList from "../../component/MessageList";

const ChatRoom = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [users, setUsers] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("username"));
    setUsername(username);
  }, []);

  useEffect(() => {
    socket.on("users", (data) => {
      const numUsers = data.length;
      setUsers(numUsers);
    });

    socket.on("receive_message", (data) => {
      setMessages(data);
    });
  }, [socket]);

  const handleLeave = () => {
    localStorage.removeItem("username");
    socket.emit("leave", username);
    navigate("/");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      return;
    }

    socket.emit("send_message", { username, text });
    setText("");
  };
  return (
    <div className="cnat-wrapper">
      <header>
        <h2>Message</h2>
        <p>Users({users})</p>
        <button onClick={handleLeave}> Leave Chat</button>
      </header>

      <div className="message-wrapper">
        {messages.length > 0 && (
          <MessageList data={messages} username={username} />
        )}
      </div>
      <div className="input-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              onChange={handleChange}
              value={text}
              placeholder="type a message...."
            />
            <button>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
