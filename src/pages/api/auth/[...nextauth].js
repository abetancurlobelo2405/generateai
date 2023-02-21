import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import clientPromise, { connectDB } from "../../../lib/mongoDBconnect";
import User from "../../../models/User";
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
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const userProfile = await User.findOne({ email: user.email });
        if (userProfile?.email !== user.email) {
          await User.create({
            username: user.name || user.username || user.email,
            email: user.email,
            isAnonymous: false,
            plan: {
              isSubscribed: false,
            },
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
