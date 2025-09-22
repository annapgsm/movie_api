const jwtSecret = 'your_jwt_secret';

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport');

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // username encoding JWT
    expiresIn: '7d', 
    algorithm: 'HS256' // This is the algorithm used to “sign” or encode the values of the JWT
  });
}

/* POST login. 
module.exports = (router) => {
  router.post('/login', (req, res,) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
} */

//POST Login new version
module.exports = (router) => {
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Incorrect username or password',
          user: user
        });
      }

      req.login(user, { session: false }, (error) => {
        if (error) return res.send(error);

        // Generate JWT
        let token = generateJWTToken({ _id: user._id, Username: user.Username });
        return res.json({ user, token });
      });
    })(req, res, next);
  });
};
