const { app } = require('@azure/functions');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.setup({ enableHttpStream: true });

app.http('paymentIntent', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    headers: {
        "Access-Control-Allow-Origin": "*",  // Allow all origins (or specify your domain)
    },
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        context.log(process.env.STRIPE_SECRET_KEY);

        //const {items} = 
        // Retrieve the amount, invoice number, and description from the request body
        const { amount, invoiceNumber, invoiceDescription } = request.body;

        if (!amount || isNaN(amount)) {
            context.res = {
                status: 400,
                body: "Amount is required and should be a valid number"
            };
            return;
        }

        if (!invoiceNumber || !invoiceDescription) {
            context.res = {
                status: 400,
                body: "Invoice number and description are required"
            };
            return;
        }


        // Create a PaymentIntent with the specified amount, currency, and metadata

        const paymentIntentVal = await stripe.paymentIntents.create({
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

        context.log(paymentIntentVal.client_secret);
        const clientSecret = await paymentIntentVal.client_secret;
        return {
            jsonBody: {
                Name: 'Hello World',
                clientSecret: clientSecret
            }
        };
        //return {clientSecret: clientSecret};

    }
});

