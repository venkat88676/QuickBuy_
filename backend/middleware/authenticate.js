const jwt = require("jsonwebtoken");
require("dotenv").config()

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.tokenSecret, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ msg: "Token expired" });
        } else {
          return res.status(401).json({ msg: "Invalid token" });
        }
      }

      req.body.userId = decoded.userId;
    
      next();
    });
  } else {
    res.send({ msg: "Provide token" });
  }
};

module.exports = { authenticate };
