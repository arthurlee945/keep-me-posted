import type { NextAuthOptions } from "next-auth";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../database/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const adapter = PrismaAdapter(prisma);
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  adapter,
  providers: [
    CredentialsProvider({
      name: "KMP-credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Email or Password Isn't Provided");
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          if (
            !user ||
            !user.password ||
            !(await compare(credentials.password, user.password))
          )
            throw new Error("Email or Password Is Wrong", {
              cause: "INCORRECT_INPUT",
            });
          const { id, name, email } = user;
          return {
            id,
            name,
            email,
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
    signOut: "/auth/signout",
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
    //     });
    //     return true;
    // },
    // session: async ({ session, token, user }) => {
    //     return {
    //         ...session,
    //         user: {
    //             ...session.user,
    //             iat: token.iat,
    //         },
    //     };
    // },
    // jwt: async ({ token, account, profile }) => {
    //     return {
    //         ...token,
    //     };
    // },
  },
  events: {},
};
