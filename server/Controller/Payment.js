const Payment = require('../Model/Payment');
require('dotenv').config();
const SendEmail = require('../utils/Nodemail');
const Stripe = require('stripe');
const axios = require('axios');
const stripe = Stripe(process.env.PAYMENT_SECRET_KEY);
const storeItems = new Map([
    [1, { priceInCents: 70, name: 'Learn React Today' }],
    [2, { priceInCents: 70, name: 'Learn CSS Today' }],
]);
exports.payment = async (req, res) => {
    try {
        const items = req.body.Items;
        const session = await stripe.checkout.sessions
            .create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: items.map((item) => {
                    const storeItem = storeItems.get(item.id);
                    console.log(item);
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: storeItem.name,
                            },
                            unit_amount: storeItem.priceInCents,
                        },
                        quantity: item.quantity,
                    };
                }),
                success_url: `https://qoves.com/facial-assessment-tool/`,
                cancel_url: `http://localhost:3030/?canceled=true`,
            })
            .then((data) => {
                return res.status(200).json({ code: 200, message: data.url });
            })
            .catch((error) => {
                return res.status(404).json({ code: 404, message: error.message });
            });
    } catch (error) {
        return res.status(500).json({ code: 500, message: error.message });
    }
};

let receipt;
exports.success = async (req, res) => {
    const payload = {
        id: req.body.id,
        object: req.body.object,
    };
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.ENDPOINT_KEY;

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret,
    });
    let event;
    try {
        event = await stripe.webhooks.constructEvent(payloadString, header, secret);
    } catch (error) {
        console.log(error.message, '...............err');
        return;
    }
    await axios
        .get(event.data.object.receipt_url)
        .then((response) => {
            receipt = response;
        })
        .catch((error) => {
            console.log(error.message, '..............Axios error');
            // res.status(404).json({code:404, message: });
        });
    switch (event.type) {
        case 'charge.succeeded':
            await SendEmail(event.data.object.receipt_email, receipt.data);
            break;
        case 'charge.failed':
            return res.status(404).json({ code: 404, message: 'charges session failed' });
        default:
            return res.status(500).json({ code: 500, message: 'In Default' });
    }
    res.json({
        success: true,
    });
};
