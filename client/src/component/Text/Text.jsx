import { useSelector } from "react-redux";
const Text = ({ data }) => {
  const { username } = useSelector((state) => state.user);
  return (
    <div className="text-wrapper">
      <p>
        {" "}
        <span>
          {" "}
          {data.username === username ? "You" : data.username}{" "}
        </span> : {data.text}{" "}
      </p>
    </div>
  );
};

export default Text;
