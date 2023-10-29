const { sign, verify } = require("jsonwebtoken");
const createTokens = (user) => {
  const accessToken = sign(
    {
      username: user.user_name,
      userId: user.user_id,
      authorized: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return accessToken;
};
const validateToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(401).json("User is not Authenticated");
  try {
    const decodedToken = verify(accessToken, process.env.JWT_SECRET);
    req.token = decodedToken;
    return next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
};
const check_authorization = (req, res, next) => {
  const accessToken = req.token;
  try {
    if (accessToken.authorized === true) return next();
    else return res.status(403).json("You are not authorized to do this!");
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = { createTokens, validateToken, check_authorization };
