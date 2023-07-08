const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validarJWT = async (req, res, next) => {
  try {
    const token = req.header("x-token");

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "No token in request",
        data: {},
      });
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    // validation
    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: "Invalid Token",
        data: {},
      });
    }

    // create new parameter
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      data: {},
    });
  }
};

module.exports = {
  validarJWT,
};
