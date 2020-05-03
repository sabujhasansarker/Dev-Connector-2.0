const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(404).json({ msg: "No token found" });
  }
  try {
    const decode = jwt.verify(token, config.get("jsonwebtoken"));
    req.user = decode.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token dose not valid" });
  }
};
