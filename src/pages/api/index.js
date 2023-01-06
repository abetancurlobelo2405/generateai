import { getSession } from "next-auth/react";
import { connectDB } from "../../lib/mongoDBconnect";
import User from "../../models/User";
import Post from "../../models/Post";
connectDB();

export default async function Home(req, res) {
  const { method } = req;
  switch (method) {
    case "GET": {
      try {
        const posts = await Post.find({}).sort({ date: -1 });
        res.status(200).json(posts);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
