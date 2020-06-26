const express = require("express");
const router = express.Router();
const {
  RestaurantLogin,
  RestaurantRegister,
  RestaurantAddFood,
    GetAllRestaurants,
    GetItemsFromRestaurant,
    GetARestaurant,
    ViewOrders
} = require("../controllers/RestaurantController");
const { check } = require("express-validator");
const passport = require("passport");
const isRestaurant = require("../middleware/isRestaurant");
const passportJWT = require("../middleware/RestaurantPassport");

router.post(
  "/auth/login",
  check("email").normalizeEmail().isEmail(),
  check("password").not().isEmpty().isLength({ min: 4 }),
  RestaurantLogin,
);
router.post(
  "/auth/register",
  check("email").normalizeEmail().isEmail(),
  check("password").not().isEmpty().isLength({ min: 4 }),
  RestaurantRegister,
);

router.post(
  "/add-item/:resid",
  passport.authenticate("jwt", { session: false }),
  isRestaurant,
  [
    check("name").not().notEmpty(),
    check("description").not().notEmpty().isLength({ min: 10 }),
    check("price").not().notEmpty(),
    check("isVeg").isBoolean(),
  ],
  RestaurantAddFood,
);

//Get ALl Restaurants
router.get('/get-all', GetAllRestaurants)

//Get Items
router.get('/get-menu/:resid', GetItemsFromRestaurant)

router.get('/get/:resid', GetARestaurant)

router.get('/view-orders', passport.authenticate("jwt", { session: false }), isRestaurant ,ViewOrders)

module.exports = router;
