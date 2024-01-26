import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { Order } from '@/app/models/Order';
const stripe = require('stripe')(process.env.STRIPE_SK);
export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL_NEXT);

  const { address, cartProducts } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  const stripeLineItems = [];
  for (const product of cartProducts) {
    const productName = product.name;
    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: productName,
        },
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    custumer_email: userEmail,
    success_url: process.env.NEXTAUTH_URL + 'cart?success=1',
    cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
    metadata: { orderID: orderDoc._id },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery fee',
          type: 'fixed_amount',
          fixed_amount: { amount: 500, currency: 'USD' },
        },
      },
    ],
  });
}
