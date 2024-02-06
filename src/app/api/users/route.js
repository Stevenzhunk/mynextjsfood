import mongoose from 'mongoose';
import { User } from '@/app/models/User';
import { isAdmin } from '@/app/libs/isAdmin';

export async function GET() {
  mongoose.connect(process.env.MONGO_URL_NEXT);

  if (await isAdmin()) {
    const user = await User.find();
    return Response.json(user);
  } else {
    return Response.json([]);
  }
}
