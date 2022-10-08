const express = require('express');
const router = express.Router();
const Controller = require('../Controller/Auth');
const passport = require('passport');
require('../Middleware/Passport');

// router.post('/signup',Controller.Signup);
// router.post('/login',Controller.Login);
// router.post('/googleLogin',Controller.googleLogin);
router.post('/user', Controller.Userdata);
router.get('/data', passport.authenticate('jwt', { session: false }), Controller.getData);
router.post('/recommendation', passport.authenticate('jwt', { session: false }), Controller.Recommendation);

module.exports = router;
