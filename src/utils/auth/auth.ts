import type { NextAuthOptions } from "next-auth";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { User } from "@prisma/client";
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
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "test",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "test",
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        session: ({ session, token, user }) => {
            // console.log("Session", { session, token, user });
            return {
                ...session,
                user: {
                    ...session.user,
                    message: "test",
                },
            };
        },
        jwt: ({ token, user }) => {
            // console.log("Jwt", { token, user });
            if (!user) return token;
            const u = user as unknown as User;
            return {
                ...token,
                message: "test",
            };
        },
        signIn: ({ user, account, profile, email, credentials }) => {
            if (account?.provider !== "google") return true;

            return true;
        },
    },
};
