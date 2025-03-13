import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  export interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      graduationYear: number | null;
      department: string | null;
    } & DefaultSession["user"];
  }
  export interface User extends DefaultUser {
    /** Define any user-specific variables here to make them available to other code inferences */
    graduationYear: number | null;
    department: string | null;
  }
}
