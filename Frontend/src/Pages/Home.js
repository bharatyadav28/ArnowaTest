import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/use-http";

import Navbar from "../components/Navbar";
import MessageForm from "../components/MessageForm";
import UserInfo from "../components/UserInfo";
import { currentUserActions } from "../store/current-user";
import retreiveCurrentUser from "../store/current-user-action";

const Home = () => {
  const userData = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const { dbConnect } = useHttp();
  const navigate = useNavigate();

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
    }, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!userData.user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(retreiveCurrentUser());
  }, []);

  return (
    <div>
      <Navbar />
      <MessageForm />
      {userData.user && <UserInfo userData={userData} />}
    </div>
  );
};

export default Home;
