import type { DefaultSession, DefaultUser } from "next-auth";
import { AdapterUser as DefaultAdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  export interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      graduationYear: string | null;
      department: string | null;
    } & DefaultSession["user"];
  }
  export interface User extends DefaultUser {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    graduationYear: string | null;
    department: string | null;
  }
}
