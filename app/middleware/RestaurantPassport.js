const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Restaurant = require("../models/Restaurant");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWTSECRET;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    let findUser;
    try {
      findUser = await Restaurant.findById(jwt_payload.id);
      if (findUser) {
        return done(null, findUser);
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e, false);
    }
  }),
);
