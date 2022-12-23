import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import clientPromise, { connectDB } from "../../src/lib/mongoDBconnect";
import Profile from "../../src/models/Profile";
import { signIn } from "next-auth/react";

connectDB();

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const userProfile = await Profile.findOne({ email: user.email });
        if (userProfile?.email !== user.email) {
          await Profile.create({
            username: user.name || user.username,
            email: user.email,
          });
        }
      } catch (error) {
        console.log(error);
      }
      return true;
    },
    async session({ session, user, token }) {
      return session;
    },
  },
});
