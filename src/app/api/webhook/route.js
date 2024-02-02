const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    console.log(event);
    console.log({ orderId: event?.data?.object?.metadata });
  }

  return Response.json('ok', { status: 200 });
}
