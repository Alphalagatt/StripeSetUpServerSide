const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


async function createPaymentIntent(req, res) {
    res.log("Creating PaymentIntent...");
    res.log("Request body: ", req.params);
    //res.log(res);

    const amount = req.params.amount;
    const invoiceNumber = req.params.invoiceNumber;
    const invoiceDescription = req.params.invoiceDescription;

    //res.log("Amount: ", amount);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'aud',
        automatic_payment_methods: {
            enabled: true,
        },
        metadata: {
            invoiceNumber: invoiceNumber,
            invoiceDescription: invoiceDescription
        }
    });


    //res.log("PaymentIntent created: ", paymentIntent);


    return {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: {
            message: "PaymentIntent created successfully",
            amount: amount,
            paymentIntent: paymentIntent.client_secret,
        }
    };
    //res.log("Response: ", res.res);
    //return res.res;


};

module.exports = createPaymentIntent;

