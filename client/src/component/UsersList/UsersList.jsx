const UsersList = ({ data }) => {
  console.log("xxxx", data);
  return (
    <div>
      <h1 className="heading">Users</h1>
      {data.map((item, index) => {
        return (
          <div key={index} className="user-unit">
            <p className="username"> {item} </p>
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
