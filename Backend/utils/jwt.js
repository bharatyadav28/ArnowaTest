import jwt from "jsonwebtoken";

const create_token = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const verify_Token = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const attachCookiesToResponse = ({ res, tokenUser }) => {
  const token = create_token({ payload: tokenUser });

  const expireTime = new Date(Date.now() + 5 * 60 * 1000);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    signed: true,
    expires: expireTime,
  });
};

export { create_token, verify_Token, attachCookiesToResponse };
