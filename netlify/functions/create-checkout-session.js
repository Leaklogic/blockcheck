const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const YOUR_DOMAIN = 'https://your-site-name.netlify.app'; // Replace with your live Netlify URL

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      
      // === NEW LINES ADDED HERE ===
      shipping_address_collection: {
        allowed_countries: ['GB'], // Only allow shipping to Great Britain
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0, // Price in pence. 0 for free shipping
              currency: 'gbp',
            },
            display_name: 'Royal Mail First Class',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 3,
              },
            },
          },
        },
      ],
      // === END OF NEW LINES ===

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