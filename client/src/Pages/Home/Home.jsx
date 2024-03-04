import "./home.styles.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../../redux/user/userSlice";
import { checkUser } from "../../utils/request";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("username"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { isSuccess } = useSelector((state) => state.user);

  useEffect(() => {
    // check if user already exist
    if (isSuccess) {
      navigate("/chatroom");
      dispatch(reset());
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    setUsername(e.target.value);
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
    dispatch(loginUser(username));
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
