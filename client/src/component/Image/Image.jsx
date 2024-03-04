import "./image.styles.scss";
import { useSelector } from "react-redux";
const Image = ({ data }) => {
  const { username } = useSelector((state) => state.user);
  return (
    <div className="unit-wrapper">
      <p> {data.username === username ? "You" : data.username} </p>
      <div className="chat-image-wrapper">
        <a href={data.url} target="_blank">
          <img src={data.url} />
        </a>
      </div>
    </div>
  );
};

export default Image;
