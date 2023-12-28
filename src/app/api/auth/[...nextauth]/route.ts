import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Google = GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
});

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [Google],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET!,
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.sub;
            }
            return session;
        },
        jwt: async ({ token, user }) => {
            if (user?.id) {
                token.id = user.id;
            }
            return token;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
