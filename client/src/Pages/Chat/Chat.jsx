import "./chat.styles.scss";
import { socket } from "../../utils/helper";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const username = JSON.parse(localStorage.getItem("username"));
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const { message, setMesage } = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    // socket.emit("join", username);

    // focus on input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username]);

  useEffect(() => {
    socket.emit("join", username);

    socket.on("new_user", (data) => {
      setInfo(`${data} joined`);

      setTimeout(() => {
        setInfo("");
      }, 10000);
    });

    socket.on("user_left", (data) => {
      setInfo(`${data} left chat`);

      setTimeout(() => {
        setInfo("");
      }, 10000);
    });

    socket.on("receive_message", (data) => {
      setMessages(data);
    });

    socket.on("users", (data) => {
      console.log(data);
    });
  }, [socket]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text == "") {
      return;
    }

    socket.emit("send_message", { userId: socket.id, message: text, username });
    setText("");
  };

  const handleLeave = () => {
    socket.emit("leave", username);
    localStorage.removeItem("username");
    navigate("/");
  };
  return (
    <div>
      <div className="header-wrapper">
        <h1 className="heading">Messages</h1>
        <div className="button-cta">
          <button onClick={handleLeave} className="leave">
            Leave Chat
          </button>
        </div>
      </div>
      <div className="info-wrapper">
        {info && <p className="info"> {info} </p>}
      </div>

      <div className="chat-wrapper">
        {messages.length > 0
          ? messages.map((message, index) => {
              return (
                <p
                  key={index}
                  className={`${message.username == username ? "you" : null}`}
                >
                  {" "}
                  <span>
                    {" "}
                    {message.username == username
                      ? "you:"
                      : `${message.username}:`}{" "}
                  </span>{" "}
                  {message.message}{" "}
                </p>
              );
            })
          : null}
      </div>
      <div className="chat-input-wrapper">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <textarea
              name="text"
              placeholder="type message here"
              onChange={handleChange}
              value={text}
              ref={inputRef}
            ></textarea>
            <button type="submit"> Send </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
