const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECERT);
      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized token Failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized token not found");
  }
});

module.exports = { protect };
