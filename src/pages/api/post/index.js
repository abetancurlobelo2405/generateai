import { getSession } from "next-auth/react";
import Post from "../../../models/Post";
import User from "../../../models/User";

const subscriptionDataHandler = async (subscriptionID) => {
  const response = await fetch(
    `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionID}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(
          `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.NEXT_PUBLIC_PAYPAL_SECRET}`
        )}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  if (data.status === "ACTIVE") {
    return data;
  } else {
    return false;
  }
};

export default async function orderSubscriptionHandler(req, res) {
  const { body } = req;
  const { chapters, userInput, cover } = body;

  if (req.method === "POST") {
    const user = await User.findOne({ email: body.user });
    const newPost = await Post.create({
      cover,
      chapters,
      userInput,
      isPrivate: false,
    });
    console.log("umnew", newPost);
    user.posts = user.posts.concat(newPost._id);
    await user.save();
  }
}
