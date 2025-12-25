const jwt = require("jsonwebtoken");
const Karyawan = require("../models/karyawanModel");
const RefreshToken = require("../models/refreshTokenModel");
const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

module.exports.logInService = async ({ username, email }) => {
  // search user
  const user = await Karyawan.findOne({ email });
  if (!user || user.username !== username) {
    throw new Error("Invalid credentials");
  }

  // Generate access token
  const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "1h",
  });

  const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d",
  });

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);
  await RefreshToken.create({
    token: refreshToken,
    user: user._id,
    expiryDate,
  });

  return token;
};

module.exports.updateTokenByEmailService = async (email, token) => {
  return await Karyawan.updateOne({ email: email }, { $set: { token: token } });
};
