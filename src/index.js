const { app } = require('@azure/functions');

app.setup({
    enableHttpStream: true,
});

const paymentIntent = require('./functions/paymentIntent');

app.http('paymentIntent', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: paymentIntent,
});

