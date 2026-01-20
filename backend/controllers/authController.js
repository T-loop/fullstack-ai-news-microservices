const { registerService, loginService } = require("../services/authService");

const registerController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await registerService(username, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await loginService(username, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { registerController, loginController };
