import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '../database/prisma';

const adapter = PrismaAdapter(prisma);
export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 15 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    adapter,
    providers: [
        CredentialsProvider({
            name: 'KMP-credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) throw new Error("Email or Password Isn't Provided");
                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                        },
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            password: true,
                        },
                    });
                    if (!user || !user.password || !(await compare(credentials.password, user.password)))
                        throw new Error('Email or Password Is Wrong', {
                            cause: 'INCORRECT_INPUT',
                        });
                    const { id, name, email } = user;
                    return {
                        id,
                        name,
                        email,
                    };
                } catch (err) {
                    console.log(err);
                    if (err instanceof Error && err.message) {
                        throw new Error(err.message, { cause: err });
                    }
                    throw new Error('Something Went Wrong In The Server', {
                        cause: err,
                    });
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || 'test',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'test',
        }),
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
    },
    callbacks: {
        //* for Database strategy
        // async signIn({ user, account, profile, email, credentials }) {
        //     if (account?.provider !== "credentials" || !user || !adapter.createSession) return true;
        //     const sessionToken = createJwtToken(user.id);
        //     const sessionExp = fromDate(15 * 24 * 60 * 60);
        //     await adapter.createSession({
        //         sessionToken,
        //         userId: user.id,
        //         expires: sessionExp,
        //     });
        //     cookies().set("next-auth.session-token", sessionToken, {
        //         expires: sessionExp,
        //         httpOnly: true,
        //     });
        //     return true;
        // },
        //! need to add custom signin to override credential if oauth with same email gets used
        //! need to signout if db updated
        // async signIn({ user, account, profile, email, credentials }) {
        //     if(account?.provider !=="credentails" && user && user.email){
        //         const u = await prisma.user.findUnique({
        //             where:{
        //                 email: user.email
        //             },
        //             select:{
        //                 id:true
        //             }
        //         })
        //     }
        //     return true;
        // },
        session: async ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    email: token.email,
                },
            };
        },
        jwt: async ({ token, session, trigger }) => {
            if (trigger === 'update') {
                token = { ...token, ...session };
            }
            return token;
        },
    },
    events: {},
};
