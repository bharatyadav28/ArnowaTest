import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/use-http";

import Navbar from "../components/Navbar";
import MessageForm from "../components/MessageForm";
import UserInfo from "../components/UserInfo";
import retreiveCurrentUser from "../store/current-user-action";
import { currentUserActions } from "../store/current-user";

const Home = () => {
  const userData = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const { dbConnect } = useHttp();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(retreiveCurrentUser());
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => {
      const handleLogout = () => {
        const postRequest = (data) => {
          dispatch(currentUserActions.removeUser());
          localStorage.removeItem("login");
          navigate("/login");
        };
        dbConnect({ url: "/api/v1/auth/logout" }, postRequest);
      };
      handleLogout();
    }, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <MessageForm />
      <UserInfo userData={userData} />
    </div>
  );
};

export default Home;
