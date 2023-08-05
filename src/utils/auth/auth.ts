import type { NextAuthOptions } from "next-auth";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../database/prisma";
import { User } from "@prisma/client";
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 15 * 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            name: "KMP Account",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (!user || !(await compare(credentials.password, user.password))) return null;
                const { id, name, email, createdAt } = user;
                console.log(user);
                return {
                    id,
                    name,
                    email,
                    createdAt,
                };
            },
        }),
    ],
    callbacks: {
        session: ({ session, token, user }) => {
            console.log("Session", { session, token, user });
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    createdAt: token.createdAt,
                },
            };
        },
        jwt: ({ token, user }) => {
            console.log("Jwt", { token, user });
            if (!user) return token;
            const u = user as unknown as User;
            return {
                ...token,
                id: u.id,
                name: u.name,
                createdAt: u.createdAt,
            };
        },
    },
};
