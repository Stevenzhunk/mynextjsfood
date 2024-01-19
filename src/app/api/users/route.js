import mongoose from 'mongoose';
import { User } from '@/app/models/User';

export async function GET() {
  mongoose.connect(process.env.MONGO_URL_NEXT);
  const user = await User.find();
  return Response.json(user);
}
