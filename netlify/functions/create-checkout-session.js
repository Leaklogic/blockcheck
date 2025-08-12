const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const YOUR_DOMAIN = 'https://leaklogicuk.co.uk';

  try {
    // Read quantity from POST body if provided (fallback to 1)
    let qty = 1;
    if (event && event.body) {
      try {
        const payload = JSON.parse(event.body);
        const q = parseInt(payload.quantity, 10);
        if (!Number.isNaN(q)) qty = Math.max(1, Math.min(10, q));
      } catch (_) {}
    }
    const session = await stripe.checkout.sessions.create({
      // Let Stripe offer all eligible methods automatically (Apple Pay, Google Pay, Link, etc.)
      automatic_payment_methods: { enabled: true },
      
      shipping_address_collection: {
        allowed_countries: ['GB'],
      },

      // === UPDATED SHIPPING OPTIONS ===
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 299, // Price in pence for £2.99
              currency: 'gbp',
            },
            display_name: 'Royal Mail Second Class',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 2,
              },
              maximum: {
                unit: 'business_day',
                value: 4,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 499, // Price in pence for £4.99
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
      // === END OF UPDATED OPTIONS ===

      // Explicitly keep PayPal in addition to automatic methods
      payment_method_types: ['paypal'],

      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'LeakLogic Block-Check Blue™ Kit',
              images: [`${YOUR_DOMAIN}/assets/hero-kit.png`], 
            },
            // === UPDATED PRODUCT PRICE ===
            unit_amount: 999, // Price in pence (999p = £9.99)
          },
          quantity: qty,
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