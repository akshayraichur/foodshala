const Restaurant = require("../models/Restaurant");

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.json({ err: "You are not authorized" });
  }

  if (req.user.role === 1) {
    next();
  } else {
    return res.json(
      { err: "You are account is not associated with Restaurant account" },
    );
  }
};
