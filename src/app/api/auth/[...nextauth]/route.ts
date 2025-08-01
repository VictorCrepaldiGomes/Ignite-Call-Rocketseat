import { PrismaAdapter } from "@/lib/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
  adapter: PrismaAdapter(),
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ account }) {
      if (
        !account?.scope?.includes("https://www.googleapis.com/auth/calendar")
      ) {
        return "/register/register-calendar/error=permissions"
        
      }
      return true;
    },

    async session({ session, user}) {
      return {
        ...session,
        user,
      }
    }
  },
});

export { handler as GET, handler as POST };
