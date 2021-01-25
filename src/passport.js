const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const { UserModel } = require('./models/user');
const { userSelector } = require('./selectors/user');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (email, password, cb) {
      //Assume there is a DB module pproviding a global UserModel
      return UserModel.findOne({ email, password })
        .then((user) => {
          if (!user) {
            return cb(null, false, { message: 'Incorrect email or password.' });
          }

          return cb(
            null,
            userSelector(user),
            {
              message: 'Logged In Successfully',
            }
          );
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    function (jwtPayload, cb) {
      // find the user in db if needed
      return UserModel.findById(jwtPayload._id)
        .then((user) => {
          return cb(null, userSelector(user));
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
