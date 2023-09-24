import classes from "./LoginForm.module.css";
import useInput from "../hooks/use-input";
import useHttp from "../hooks/use-http";
import { notifySuccess, notifyError, isEmail, isSixChars } from "../utils";

const MessageForm = () => {
  const { isLoading, error, dbConnect: sendData, setError } = useHttp();

  if (error) {
    error && notifyError(error);
    setError(null);
  }

  const {
    input: message,
    setInput: setMessage,
    inputIsValid: messageIsValid,
    setInputTouched: setMessageTouched,
    inputHasError: messageHasError,
    inputClasses: messageClasses,
    inputChangeHandler: messageChangeHandler,
    inputBlurHandler: messageBlurHandler,
  } = useInput(isSixChars);

  // on form submit
  const handleFormSubmit = async (events) => {
    events.preventDefault();

    const postRequest = (data) => {
      setMessage("");
      setMessageTouched(false);
    };

    const requiredConfig = {
      url: "/api/v1/info/message",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: { message },
    };

    sendData(requiredConfig, postRequest);
  };

  const isFormValid = messageIsValid;

  return (
    <div className={classes.main}>
      <form method="post" className={classes.form} onSubmit={handleFormSubmit}>
        <div className={classes["form-control"]}>
          <label>message</label>
          <input
            type="message"
            name="message"
            value={message}
            className={messageClasses}
            onChange={messageChangeHandler}
            onBlur={messageBlurHandler}
          />
          {messageHasError && (
            <p className={classes["error-msg"]}>Message is not valid</p>
          )}
        </div>

        <div className={classes.btns}>
          <button disabled={isLoading || !isFormValid} type="submit">
            {isLoading ? "Submitting in..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
