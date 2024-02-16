import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("username"));
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user]);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      setError("please enter username");
      return;
    }

    setError("");
    localStorage.setItem("username", JSON.stringify(username));
    navigate("/chat", { state: { username } });
  };
  return (
    <div>
      <h1 className="heading">E-Chat</h1>
      <p className="text-info">
        Just enter username and start talking to strangers
      </p>
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
    </div>
  );
};

export default Home;
