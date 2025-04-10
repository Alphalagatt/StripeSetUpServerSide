const { app } = require('@azure/functions');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.setup({ enableHttpStream: true });

app.http('paymentIntent', {
    methods: ['GET','POST'],
    authLevel: 'anonymous',
    headers: {
        "Access-Control-Allow-Origin": "*",  // Allow all origins (or specify your domain)
    },
    handler: (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        context.log(process.env.STRIPE_SECRET_KEY);
        context.log("request: ", request);
        context.log("context: ", context);

        const { amount, invoiceNumber, invoiceDescription } = request.params;

        /*

        if (!amount || isNaN(amount)) {
            return {
                jsonBody: {
                    body: "Amount is required and should be a valid number"
                }
            }

        };


        if (!invoiceNumber || !invoiceDescription) {
            return {
                jsonBody: {
                    status: 400,
                    body: "Invoice number and description are required"
                }
            };
        }


        // Create a PaymentIntent with the specified amount, currency, and metadata
        /*
                stripe.paymentIntents.create({
                    amount: amount * 100,
                    currency: 'aud',
                    automatic_payment_methods: {
                        enabled: true,
                    },
                    metadata: {
                        invoiceNumber: invoiceNumber,
                        invoiceDescription: invoiceDescription
                    }
                }).then((paymentIntent) => {
                    context.log("PaymentIntent created: ", paymentIntent);
                    return paymentIntent;
                    
                }).catch((error) => {
                    context.log("Error creating PaymentIntent: ", error);
                    context.res = {
                        status: 500,
                        body: "Error creating PaymentIntent"
                    };
                });
        */
        //context.log(paymentIntentVal.client_secret);
        //const clientSecret = await paymentIntentVal.client_secret;
        return {
            jsonBody: {
                Name: 'Hello World',
                //request: request,
                //context: context,
            }
        };
        //return {clientSecret: clientSecret};

    }
});

