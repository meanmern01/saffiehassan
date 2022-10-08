const express = require('express');
// const bodyParser = require('body-parser');
const router = express.Router();
const Payment = require('../Controller/Payment');
const passport = require('passport') ;
require('../Middleware/Passport');

router.post('/payment',Payment.payment);
router.post('/webhooks',express.raw({type: 'application/json'}),Payment.success);
module.exports = router;