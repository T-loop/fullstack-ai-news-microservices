const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerService = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await authModel.registerModel(username, hashedPassword);
};

const loginService = async (username, password) => {
  const user = await authModel.finduserModel(username);
  if (!user) throw new Error("User nicht gefunden");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Falsches Passwort");

  const token = jwt.sign(
    { userid: user.userid, username: user.username },
    process.env.SECRETPASSWORDJWT,
    { expiresIn: "1h" }
  );

  return token;
};

module.exports = { registerService, loginService };
