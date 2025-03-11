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
      authorization: {
        params: { scope: "openid profile email churros:profile" },
      },
      client: {
        id_token_signed_response_alg: "HS256",
      },
      profile(profile) {
        console.log("profile", profile);
        return {
          id: profile.sub,
          name: profile.name ?? profile.preferred_username,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        console.log("session.user", session.user);
        session.user.name = user.name;
        // You can add more user properties to the session here if needed
      }
      return session;
    },
    jwt: async ({ token, user, account, profile }) => {
      if (user) {
        //console.log("jwt", token, user, account, profile);
      }
      return token;
    },
  },
};

export const auth = () => getServerSession(authOptions);
