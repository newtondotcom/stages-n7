import { getServerSession, type NextAuthOptions } from "next-auth";
import AuthentikProvider from "next-auth/providers/authentik";
import { adapter } from "@/types/adapter";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export const authOptions: NextAuthOptions = {
  adapter: adapter,
  providers: [
    AuthentikProvider({
      clientId: process.env.AUTHENTIK_CLIENT_ID!,
      clientSecret: process.env.AUTHENTIK_CLIENT_SECRET!,
      issuer: process.env.AUTHENTIK_ISSUER,
      authorization: {
        params: { scope: "openid profile email churros:profile" },
      },
      profile(profile) {
        return {
          id: profile.uid,
          name: profile.fullName ?? profile.preferred_username,
          email: profile.email,
          image: profile.pictureURL,
          graduationYear: profile.graduationYear.toString(),
          department: profile.major.uid,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
};

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
