const { app } = require('@azure/functions');

app.setup({
    enableHttpStream: true,
});

const paymentIntent = require('./functions/paymentIntent');
const {createPaymentIntentCheckout, sessionStatus} = require('./functions/checkoutUISecret');

app.http('paymentIntent', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (req, res) => {
        try {
            const response = await paymentIntent(req, res);
            return {
                status: response.status,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: response.body.message,
                    amount: response.body.amount,
                    paymentIntent: response.body.paymentIntent,
                }),
            }; 
        } catch (error) {
            console.error("Error creating PaymentIntent: ", error);
            // Log the error details
            return {
                status: 500,
                body: JSON.stringify({
                    error: "Internal Server Error",
                    message: error.message,
                }),
            };
        }
    },
});

app.http('createPaymentIntentCheckout', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (req, res) => {
        try {
            const response = await createPaymentIntentCheckout(req, res);
            return {
                status: response.status,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: response.body.message,
                    amount: response.body.amount,
                    paymentIntent: response.body.paymentIntent,
                }),
            }; 
        } catch (error) {
            console.error("Error creating PaymentIntent: ", error);
            // Log the error details
            return {
                status: 500,
                body: JSON.stringify({
                    error: "Internal Server Error",
                    message: error.message,
                }),
            };
        }
    },
});

