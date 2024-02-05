import { getServerSession } from 'next-auth';
import { authOptions, isAdmin } from '../auth/[...nextauth]/route';
import { Order } from '@/app/models/Order';
import mongoose from 'mongoose';

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL_NEXT);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get('id');
  if (_id) {
    return Response.json(await Order.findById(_id));
  }

  if (admin) {
    return Response.json(await Order.find());
  }

  if (userEmail) {
    return Response.json(await Order.find({ userEmail }));
  }

  return Response.json({
    message: 'YOUR NOT ARE A ADMIN OR USER PLS LOGIN FIRST',
  });
}
