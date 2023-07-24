const express = require("express");
const router = express.Router();
const User = require("../controllers/userController");
const token = require("../token/token");

router.get("/", async (req, res) => {
  try {
    let data = await User.fetchAll();
    res.status(200).json({
      data: data,
      message: "User fetch successfully.",
    });
  } catch (error) {
    res.status(422).json({ message: "Unable to feth." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let user = await User.fetch(req.params.id);
    let authToken = token.createToken(user);
    res.status(200).json({
      data: user,
      token: authToken,
      message: "User fetch sucessfully.",
    });
  } catch (error) {
    res.status(422).json({ message: "Unable to feth." });
  }
});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", getToken, async (req, res) => {
  try {
    let id = req.params.id;
    let authToken = req.token;
    let data = await token.verifyToken(authToken);
    res.status(200).json({ data: data, message: "User deleted successfully." });
  } catch (error) {
    console.log(error)
    res.status(422).json({ message: error });
  }
});

function getToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const tokenData = bearerHeader.split(" ");
    req.token = tokenData[1];
    next();
  } else {
    res.status(400).json({ message: "Invalid tokens." });
  }
}
module.exports = router;
