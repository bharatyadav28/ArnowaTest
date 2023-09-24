import { Link, useNavigate } from "react-router-dom";
import useHttp from "../hooks/use-http";

import classes from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { currentUserActions } from "../store/current-user";

const Navbar = () => {
  const navigate = useNavigate();
  const { dbConnect } = useHttp();
  const dispatch = useDispatch();

  const handleLogout = () => {
    const postRequest = (data) => {
      dispatch(currentUserActions.removeUser());
      localStorage.removeItem("login");
      navigate("/login");
    };
    dbConnect({ url: "/api/v1/auth/logout" }, postRequest);
  };
  return (
    <ul className={`${classes.navbar}`}>
      <li>
        <Link to="/">Arnowa Test</Link>
      </li>
      <li onClick={handleLogout}>
        <Link to="#">Logout</Link>
      </li>
    </ul>
  );
};

export default Navbar;
