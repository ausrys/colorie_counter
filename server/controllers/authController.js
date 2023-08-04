const bcrypt = require("bcrypt");
const { User } = require("../models");
const { createTokens } = require("../auth/JWT");
module.exports.post_register = async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username)
    return res.status(400).json("All values must be entered");
  const existingUser = await User.findOne({ where: { user_email: email } });
  if (existingUser) return res.status(400).json("User with that email exists");
  try {
    const hash = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 12, function (err, hash) {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
    await User.create({
      user_name: username,
      user_email: email,
      user_password: hash,
    });
    res.status(200).json("User Created");
  } catch (error) {
    console.log(error);
    res.status(400).json(error.errors[0].message);
  }
};
module.exports.post_login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json("All values must be entered");
  const existingUser = await User.findOne({ where: { user_email: email } });
  if (!existingUser) return res.status(400).json("User doesn't exist");
  bcrypt.compare(password, existingUser.user_password).then((isMatching) => {
    if (!isMatching) res.status(400).json("Wrong username or password");
    else {
      const accessToken = createTokens(existingUser);
      const { user_password, ...rest } = existingUser.dataValues;
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        sameSite: "none",
        secure: "false",
      });
      res.status(200).json({ ...rest });
    }
  });
};
// Only for testing
module.exports.get_cookie = async (req, res) => {
  res.status(200).json(req.cookies);
};
module.exports.logOut = async (req, res) => {
  res.clearCookie("accessToken");

  res.status(200).json("You have been loged out");
};
