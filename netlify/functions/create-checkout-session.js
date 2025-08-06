const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // ===> IMPORTANT: REPLACE WITH YOUR LIVE NETLIFY URL <===
  const YOUR_DOMAIN = 'https://leaklogicuk.co.uk';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'LeakLogic Block-Check Blue™ Kit',
              images: [`${YOUR_DOMAIN}/assets/hero-kit.png`], 
            },
            unit_amount: 1499, // Price in pence (1499p = £14.99)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`, 
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};