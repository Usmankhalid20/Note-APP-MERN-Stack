const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const dotenv = require("dotenv").config();

const Middle = async (req, res, next) => {
  try {
    console.log("Authorization Header:", req.headers.authorization);

    const token = req.headers.authorization.split(" ")[1];
    console.log(token); // token is not generate  error
    if (!token) {
      return res.status(401).json({success: false, message: "Unauthorized hello" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({success: false, message: "wrong token " });
    }

    const user = await User.findById({ _id: decoded.id });
    if (!user) {
      return res.status(401).json({ success: false, message: "no user" });
    }
    const newUser = {
      name: user.name,
    };
    req.user = newUser;
    next();
  } catch (error) {
    return res.status(500).json({ error, message: "Please login " });
  }
};
module.exports = Middle;
