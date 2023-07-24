const jwt = require("jsonwebtoken");
const SECRET = "DSADAS45dsaew544";

const createToken = (data) => {
  return jwt.sign(
    {
      data: data,
      iat: Math.floor(Date.now() / 1000) - 30,
    },
    SECRET
  );
};

const verifyToken = async (token) => {
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) throw "Invalid token.";

    return decoded.data;
  });
};

module.exports = { createToken, verifyToken };
