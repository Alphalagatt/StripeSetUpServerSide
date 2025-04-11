//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST);


async function createPaymentIntentCheckout(req, res) {
    res.log("Creating PaymentIntent Checkout...");
    res.log("Request body: ", req.params);
    //res.log(res);

    const amount = req.params.amount;
    const invoiceNumber = req.params.invoiceNumber;
    const invoiceDescription = req.params.invoiceDescription;
    const propertyAddress = req.params.propertyAddress;
    const ListingAgentName = req.params.ListingAgentName;
    const ListingAgencyName = req.params.ListingAgencyName;
    const PriceList = req.params.PriceList;
    const ProductName = req.params.ProductName;
    const YOUR_DOMAIN = req.params.YOUR_DOMAIN;

    //res.log("Amount: ", amount);

    const paymentIntent = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'aud',
                    unit_amount: amount*100, // amount in cents (i.e. $20.00)
                    product_data: {
                        name: invoiceNumber,
                        description: `
                            propertyAddress: ${propertyAddress}\n
                            ListingAgentName: ${ListingAgentName}\n
                            ListingAgencyName: ${ListingAgencyName}\n
                            PriceList: ${PriceList}\n,
                            ProductName: ${ProductName}\n,
                        `,
                        images: [`https://icon2.cleanpng.com/20180427/cye/kisspng-computer-icons-investment-investor-clip-art-intermediary-5ae341eba78030.8997880415248429876861.jpg`],
                        metadata: {
                            propertyAddress: propertyAddress,
                            ListingAgentName: ListingAgentName,
                            ListingAgencyName: ListingAgencyName,
                            PriceList: PriceList,
                            ProductName: ProductName,
                        }
                    }
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        return_url: `${YOUR_DOMAIN}/return.html?session_id={CHECKOUT_SESSION_ID}`,
        //success_url: `${YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        //cancel_url: `${YOUR_DOMAIN}/cancel.html?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.log("PaymentIntent created. Session ID: ", paymentIntent);


    return {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: {
            message: "checkout session created successfully",
            amount: amount,
            paymentIntent: paymentIntent,
        
            //url: paymentIntent.url,
        }
    };


};

//response from the payment intent..
async function sessionStatus(req, res) {

    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    res.log("Session retrieved: ", session);

    return {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: {
            message: "checkout session created successfully",
            session: session,
        }
    };
}

module.exports.sessionStatus = sessionStatus;
module.exports.createPaymentIntentCheckout = createPaymentIntentCheckout;


