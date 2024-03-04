import "./messageList.styles.scss";
import Text from "../Text/Text";
import Image from "../Image/Image";
const MessageList = ({ data, username }) => {
  return (
    <div className="container">
      {data.map((item, index) => {
        console.log("xxxx", item);
        return (
          <div key={index} className="message-unit">
            {item.type === "text" ? (
              <Text data={item} />
            ) : (
              <Image data={item} />
            )}
            {/* <p>
              {" "}
              <span>
                {" "}
                {username == item.username ? "You" : item.username}
              </span>{" "}
              : {item.text}{" "}
            </p> */}
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
