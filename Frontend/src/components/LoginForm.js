import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import classes from "./LoginForm.module.css";
import useInput from "../hooks/use-input";
import useHttp from "../hooks/use-http";
import {
  notifySuccess,
  notifyError,
  isEmail,
  isThreeChars,
  isTenChars,
} from "../utils";

const LoginForm = () => {
  const { isLoading, error, dbConnect: sendData, setError } = useHttp();

  if (error) {
    error && notifyError(error);
    setError(null);
  }

  const {
    input: name,
    inputIsValid: nameIsValid,
    inputHasError: nameHasError,
    inputClasses: nameClasses,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isThreeChars);

  const {
    input: email,
    inputIsValid: emailIsValid,
    inputHasError: emailHasError,
    inputClasses: emailClasses,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail);

  const {
    input: number,
    inputIsValid: numberIsValid,
    inputHasError: numberHasError,
    inputClasses: numberClasses,
    inputChangeHandler: numberChangeHandler,
    inputBlurHandler: numberBlurHandler,
  } = useInput(isTenChars);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  // on form submit
  const handleFormSubmit = async (events) => {
    events.preventDefault();

    const postRequest = (data) => {
      notifySuccess(data.msg);
      notifySuccess("Hello " + data?.user?.name);
      localStorage.setItem("login", true);
      setIsLoggedIn(true);
    };

    const requiredConfig = {
      url: "/api/v1/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: { mobileno: number, email, name },
    };

    sendData(requiredConfig, postRequest);
  };

  const isFormValid = emailIsValid && nameIsValid && numberIsValid;

  return (
    <div className={classes.main}>
      <div className="d-flex justify-content-center mb-4">
        {/* <img src={favicon} /> */}
        <h4 className={classes["site-name"]}>Arnowa Test</h4>
      </div>

      <div className={classes.title}>
        <p>Login</p>
      </div>

      <form method="post" className={classes.form} onSubmit={handleFormSubmit}>
        <div className={classes["form-control"]}>
          <label>Name</label>
          <input
            type="name"
            name="name"
            value={name}
            className={nameClasses}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && (
            <p className={classes["error-msg"]}>Name is not valid</p>
          )}
        </div>

        <div className={classes["form-control"]}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            className={emailClasses}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && (
            <p className={classes["error-msg"]}>Email is not valid</p>
          )}
        </div>

        <div className={classes["form-control"]}>
          <label>Mobile no.</label>
          <input
            type="number"
            name="number"
            value={number}
            className={numberClasses}
            onChange={numberChangeHandler}
            onBlur={numberBlurHandler}
          />
          {numberHasError && (
            <p className={classes["error-msg"]}>Number is not valid</p>
          )}
        </div>

        <div className={classes.btns}>
          <button disabled={isLoading || !isFormValid} type="submit">
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
