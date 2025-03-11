import { getServerSession, type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import AuthentikProvider from "next-auth/providers/authentik";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    AuthentikProvider({
      clientId: process.env.AUTHENTIK_CLIENT_ID!,
      clientSecret: process.env.AUTHENTIK_CLIENT_SECRET!,
      issuer: process.env.AUTHENTIK_ISSUER,
      authorization: { params: { scope: "preferred_username" } },
      client: {
        token_endpoint_auth_method: "client_secret_post",
        id_token_signed_response_alg: "HS256",
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        console.log("session.user.id", session.user);
        session.user.name = user.id;
        // You can add more user properties to the session here if needed
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const auth = () => getServerSession(authOptions);
