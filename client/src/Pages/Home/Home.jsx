import "./home.styles.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../utils/helper";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("username"));
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // check if user already exist
  }, [socket]);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const checkUser = async (username) => {
    try {
      const res = await fetch(`/checkUser`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      setError("please enter username");
      return;
    }

    const { message } = await checkUser(username);

    if (message) {
      setError("user already exist");
      return;
    }
    setError("");
    localStorage.setItem("username", JSON.stringify(username));
    socket.emit("join", username);
    navigate("/chatroom");
  };
  return (
    <div id="home">
      <div className="text-wrapper">
        <h1 className="heading">E-Chat</h1>
        <p className="text center">Escape the matrix</p>
      </div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter username...."
            onChange={handleChange}
          />
          <p className="error"> {error} </p>
          <button type="submit">Enter Chat Room</button>
        </form>
      </div>
      <p className="text-info center">Created By Kofi Arhin </p>
    </div>
  );
};

export default Home;
