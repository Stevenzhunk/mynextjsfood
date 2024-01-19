import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { User } from '@/app/models/User';
import { UserInfo } from '@/app/models/UserInfo';

export async function PUT(req) {
  //Connect MongoDB
  mongoose.connect(process.env.MONGO_URL_NEXT);
  //Collect data from req
  const data = await req.json();
  //Extract information fields from the object, from others using spread
  //for two different models
  const { _id, name, image, ...otherUserInfo } = data;

  let filter = {};

  //for manage of users for admin (only if get _id on req)
  if (_id) {
    filter = { _id };
  } else {
    //Get data from the session using authOptions
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    filter = { email };
  }
  //find user on user model for update on UserInfo
  const user = await User.findOne(filter);

  //Method udapteOne (email/id from session, update name - image from user collect )
  await User.updateOne(filter, { name, image });

  //Use the 'findOneAndUpdate' method with email/id from the session,
  //insert 'otherUserInfo', and update 'name' and 'image' in the 'UserInfo' collection
  await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, {
    upsert: true,
  });

  //Return a response with true
  return Response.json(true);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  let filterUser = {};
  if (_id) {
    filterUser = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }
    filterUser = { email };
  }

  const user = await User.findOne(filterUser).lean();
  const userInfo = await UserInfo.findOne({ email: user.email }).lean();

  return Response.json({ ...user, ...userInfo });
}
