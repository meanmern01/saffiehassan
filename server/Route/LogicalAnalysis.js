const express = require('express');
const router = express.Router();
const LogicalAnalysis = require('../Controller/LogicalAnalysis');
const passport = require('passport') ;
require('../Middleware/Passport');

router.post('/logicalAnalysis',passport.authenticate('jwt', {session: false}),LogicalAnalysis.LogicalAnlysis);
router.get('/logicalResponse',passport.authenticate('jwt', {session: false}),LogicalAnalysis.LogicalResponse);

module.exports = router;