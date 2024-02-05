import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { UserInfo } from '@/app/models/UserInfo';
import { Order } from '@/app/models/Order';
import mongoose from 'mongoose';

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL_NEXT);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  let isAdmin = false;

  const url = new URL(req.url);
  const _id = url.searchParams.get('id');
  if (_id) {
    return Response.json(await Order.findById(_id));
  }

  if (userEmail) {
    const userInfo = await UserInfo.findOne({ email: userEmail });
    if (userInfo) {
      isAdmin = userInfo.admin;
    }
  }

  if (isAdmin) {
    return Response.json(await Order.find());
  }

  if (userEmail) {
    return Response.json(await Order.find({ userEmail }));
  }
}