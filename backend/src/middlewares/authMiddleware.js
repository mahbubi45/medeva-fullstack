const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports.authenticateVerifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token required" });

  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = payload; // { id, role }
    next();
  });
};

// Middleware RBAC admin
module.exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
       status: 403,
       message: "Forbidden: You are not an admin" });
  }
  next();
};

// extract token header (get profile)
module.exports.tokenExtractor = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.token = authHeader.substring(7);
  next();
};