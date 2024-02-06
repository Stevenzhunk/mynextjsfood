import { MenuItem } from '@/app/models/MenuItem';
import mongoose from 'mongoose';
import { isAdmin } from '@/app/libs/isAdmin';

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL_NEXT);
  const data = await req.json();
  if (await isAdmin()) {
    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc);
  } else {
    Response.json({});
  }
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL_NEXT);
  if (await isAdmin()) {
    const { _id, ...data } = await req.json();
    await MenuItem.findByIdAndUpdate(_id, data);
  }
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL_NEXT);
  return Response.json(await MenuItem.find());
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL_NEXT);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (await isAdmin()) {
    await MenuItem.deleteOne({ _id });
  }
  return Response.json(true);
}
