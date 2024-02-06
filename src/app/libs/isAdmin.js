import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { UserInfo } from '@/app/models/UserInfo';

// Middleware for CheckAdmin

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });

  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}
