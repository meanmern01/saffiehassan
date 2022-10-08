const express = require('express');
const router = express.Router();
const Analysis = require('../Controller/Analysis');
const passport = require('passport') ;
require('../Middleware/Passport');

router.post('/analysis',passport.authenticate('jwt', {session: false}),Analysis.anlysis);

module.exports = router;