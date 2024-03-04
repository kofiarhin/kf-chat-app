import "./sidenav.styles.scss";
import { IoMdClose } from "react-icons/io";
import UsersList from "../UsersList/UsersList";
import { useSelector } from "react-redux";
const SideNav = ({ setShowSideNav, showSideNav }) => {
  const { users } = useSelector((state) => state.user);
  return (
    <div id="sidenav" className={`${showSideNav ? "show" : null}`}>
      <div className="content-wrapper">
        <IoMdClose
          onClick={() => setShowSideNav(false)}
          className="close-icon"
        />

        {users.length > 0 ? <UsersList data={users} /> : null}
        {/* <UsersList data={users} /> */}
      </div>
    </div>
  );
};

export default SideNav;
