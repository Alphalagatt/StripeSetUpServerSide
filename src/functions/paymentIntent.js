const { app } = require('@azure/functions');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//app.setup({ enableHttpStream: true });

app.http('paymentIntent', {
    methods: ['GET','POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
        
        console.log(process.env.STRIPE_SECRET_KEY);

        //const {items} = request.body;
        
        const paymentIntentVal = await stripe.paymentIntents.create({
            amount: 1000,
            currency: 'aud',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        console.log(paymentIntentVal);

        return {clientSecret: "await paymentIntent.client_secret"};
    }
});

