import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { notifyError } from "../utils";

const Authenticated = ({ children }) => {
  const user = useSelector((state) => state.currentUser.user);

  if (!user) {
    notifyError("Please login first");
    return <Navigate to="/login" replace={true} />;
  }

  return <> {children} </>;
};

const PreventReLogin = ({ children }) => {
  const isLoggedIn = localStorage.getItem("login");

  if (isLoggedIn) {
    notifyError("Please logout first");
    return <Navigate to="/" replace={true} />;
  }

  return <> {children} </>;
};

export { PreventReLogin, Authenticated };
