import { authOptions } from '@/utils/auth/auth';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//     return await NextAuth(req, res, authOptions);
// }
// export { handler as GET, handler as POST };
