import "./chatRoom.styles.scss";
import { IoMdSend, IoMdLogOut, IoMdMenu } from "react-icons/io";
import { MdImage } from "react-icons/md";
import { socket } from "../../utils/helper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageList from "../../component/MessageList/MessageList";
import SideNav from "../../component/SideNav/SideNav";
import { logoutUser, reset, setUsers } from "../../redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../../redux/message/messageSlice";
import ImageModal from "../../component/ImageModal/ImageModal";
import { openModal } from "../../redux/Navigation/navigationSlice";

const ChatRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, username, users } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  // const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [counter, setCounter] = useState(0);
  const [info, setInfo] = useState("");
  const [typingInfo, setTypingInfo] = useState("");
  const [showSideNav, setShowSideNav] = useState(false);

  // when user logs out
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      dispatch(reset());
    }
  }, [isSuccess]);

  // runs once
  useEffect(() => {
    // // check if user is logged in
    // const username = JSON.parse(localStorage.getItem("username"));
    socket.emit("refresh_user", username);

    // get messages
    socket.emit("get_messages");
  }, []);

  useEffect(() => {
    socket.on("users", (data) => {
      // get users
      dispatch(setUsers(data));
    });

    socket.on("receive_message", (data) => {
      dispatch(setMessages(data));
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
    dispatch(logoutUser(username));
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

    socket.emit("send_message", { username, text, type: "text" });
    setText("");
  };

  return (
    // chat-wrapper
    <div className="chat-wrapper">
      <ImageModal />
      <SideNav setShowSideNav={setShowSideNav} showSideNav={showSideNav} />
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
      <div className="messages-wrapper">
        {messages.length > 0 && (
          <MessageList data={messages} username={username} />
        )}
      </div>

      {/* input-wrapper */}
      <div className="input-wrapper">
        <button onClick={() => dispatch(openModal())}>
          <MdImage />
        </button>
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
