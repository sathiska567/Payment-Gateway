const express = require('express');
const {braintreeTokenController,braintreePaymentController} = require('../controller/paymentGatewayController');

const router = express.Router();

// payment routes
// token
router.get("/braintree/token",braintreeTokenController)

// payment
router.post("/braintree/payment",braintreePaymentController)


module.exports = router;