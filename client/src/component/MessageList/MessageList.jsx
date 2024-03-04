import "./messageList.styles.scss";
const MessageList = ({ data, username }) => {
  console.log(data);
  return (
    <div className="container">
      {data.map((item, index) => {
        return (
          <div key={index} className="message-unit">
            <p>
              {" "}
              <span>
                {" "}
                {username == item.username ? "You" : item.username}
              </span>{" "}
              : {item.text}{" "}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
