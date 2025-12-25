const { model } = require("mongoose");
const authService = require("../service/autService");

module.exports.logInController = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Username and Email are required" });
    }

    const token = await authService.logInService(req.body);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    await authService.updateTokenByEmailService(email, token);

    res.json({ success: true, message: 200, token });
  } catch (err) {
    next(err);
  }
};
