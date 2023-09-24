import { UnauthenticatedError } from "../errors/index.js";
import { verify_Token } from "../utils/index.js";

const authentication = (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  try {
    const { userId, name, role } = verify_Token({ token });
    req.user = { userId, name, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
};

export default authentication;
