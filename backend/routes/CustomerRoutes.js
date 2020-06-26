const express = require("express");
const router = express.Router();
const {
  CustomerLogin,
  CustomerRegister,
  CustomerOrder, CustomerAccount
} = require("../controllers/CustomerController");
const { check } = require("express-validator");
const passport = require("passport");
const passportJWT = require("../middleware/CustomerPassport");

// Login Route
router.post("/auth/login", [
  check("email").normalizeEmail().isEmail(),
  check("password").not().isEmpty().isLength({ min: 4 }),
], CustomerLogin);

// Register Route
router.post("/auth/register", [
  check("email").normalizeEmail().isEmail(),
  check("password").not().isEmpty().isLength({ min: 4 }),
], CustomerRegister);


// passport.authenticate("jwt", { session: false })
router.post('/order', CustomerOrder)

router.get('/find/:cid', CustomerAccount)

module.exports = router;
