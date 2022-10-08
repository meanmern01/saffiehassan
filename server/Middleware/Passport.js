const passportJWT = require("passport-jwt");
const passport = require("passport");
const Userdata = require("../Model/User");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    },
    function (jwtPayload, cb) {
      return Userdata.findOne({ userId: jwtPayload.userId })
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err, "...........");
        });
    }
  )
);
// //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
