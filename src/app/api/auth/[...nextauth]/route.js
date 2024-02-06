import nextAuth from 'next-auth';
import { authOptions } from '@/app/api/auth/authHandler';

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
