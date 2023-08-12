import type { NextAuthOptions } from "next-auth";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../database/prisma";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 15 * 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            name: "KMP-credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) throw new Error("Email or Password Isn't Provided");
                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                        },
                    });
                    if (!user || !user.password || !(await compare(credentials.password, user.password)))
                        throw new Error("Email or Password Is Wrong", { cause: "INCORRECT_INPUT" });
                    const { id, name, email, createdAt } = user;
                    return {
                        id,
                        name,
                        email,
                        createdAt,
                    };
                } catch (err) {
                    if (err instanceof Error && err.message) {
                        throw new Error(err.message, { cause: err });
                    }
                    throw new Error("Something Went Wrong In The Server", { cause: err });
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "test",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "test",
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        // signOut: "/auth/signout",
    },
    callbacks: {
        // session: ({ session, token, user }) => {
        //     return {
        //         ...session,
        //         user: {
        //             ...session.user,
        //         },
        //     };
        // },
        // jwt: ({ token, user }) => {
        //     if (!user) return token;
        //     const u = user as unknown as User;
        //     return {
        //         ...token,
        //     };
        // },
        signIn: ({ user, account, profile, email, credentials }) => {
            if (account?.provider !== "google") return true;

            return true;
        },
    },
    events: {
        // signOut({ token, session }) {
        //     console.log(token, session);
        //     if (!session) {
        //         console.log(session);
        //     }
        // },
    },
};
