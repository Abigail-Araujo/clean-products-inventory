const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userExtractor = async (request, response, next) => {
  try {
    const token = request.cookies?.accessToken;

    if (!token) {
      return response.redirect("/");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    request.user = user;
    next();
  } catch (error) {
    return response.redirect("/");
  }
};

module.exports = { userExtractor };
