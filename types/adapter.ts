import { AdapterUser as DefaultAdapterUser } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { db } from "@/lib/db";

export interface AdapterUser extends DefaultAdapterUser {
  graduationYear: string;
  department: string;
}

export const adapter = PrismaAdapter(db) as typeof PrismaAdapter & {
  getUser: (id: string) => Promise<AdapterUser | null>;
};
