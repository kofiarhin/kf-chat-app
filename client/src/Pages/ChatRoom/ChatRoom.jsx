import "./chatRoom.styles.scss";
import { IoMdSend, IoMdLogOut, IoMdMenu } from "react-icons/io";
import { socket } from "../../utils/helper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageList from "../../component/MessageList/MessageList";
import SideNav from "../../component/SideNav/SideNav";

const ChatRoom = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [users, setUsers] = useState(0);
  const [messages, setMessages] = useState([]);
  const [counter, setCounter] = useState(0);
  const [info, setInfo] = useState("");
  const [typingInfo, setTypingInfo] = useState("");
  const [showSideNav, setShowSideNav] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("username"));
    setUsername(username);
  }, []);

  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
    });

    socket.on("receive_message", (data) => {
      setMessages(data);
    });

    socket.on("new_user", (username) => {
      setInfo(`${username} just joined`);

      setTimeout(() => {
        setInfo("");
      }, 8000);
    });

    socket.on("user_left", (username) => {
      setInfo(`${username} just left`);
      setTimeout(() => {
        setInfo("");
      }, 8000);
    });

    socket.on("is_typing", (data) => {
      setInfo(`${data} is typing...`);

      setTimeout(() => {
        setInfo("");
      }, 5000);
    });
  }, [socket]);

  const handleLeave = () => {
    localStorage.removeItem("username");
    socket.emit("leave", username);
    navigate("/");
  };

  const handleChange = (e) => {
    socket.emit("is_typing", username);
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
    // chat-wrapper
    <div className="chat-wrapper">
      <SideNav
        setShowSideNav={setShowSideNav}
        showSideNav={showSideNav}
        users={users}
      />
      <div className="container">
        <header className="header-wrapper">
          {/* <p className="num-users">Users({users})</p> */}
          <div className="icon-wraper">
            <IoMdMenu
              size={25}
              onClick={() => setShowSideNav(true)}
              className="menu-icon"
            />
          </div>
          {info && <p> {info} </p>}
          <button onClick={handleLeave}>
            Logout <IoMdLogOut />
          </button>
        </header>
      </div>

      {/* messages-wrapper */}
      <div className="message-wrapper">
        {messages.length > 0 && (
          <MessageList data={messages} username={username} />
        )}
      </div>

      {/* input-wrapper */}
      <div className="input-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              onChange={handleChange}
              value={text}
              placeholder="type a message...."
            />
            <button>
              <IoMdSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
