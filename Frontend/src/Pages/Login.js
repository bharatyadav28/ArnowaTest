import LoginForm from "../components/LoginForm";

const Login = ({ createLoginStorage }) => {
  return (
    <div className="grey-background" style={{ position: "absolute", top: 0 }}>
      <LoginForm createLoginStorage={createLoginStorage} />
    </div>
  );
};

export default Login;
