import { getSession } from "next-auth/react";
import { connectDB } from "../../../lib/mongoDBconnect";
import User from "../../../models/User";
connectDB();
export default async function UserData(req, res) {
  const { method, body, cookies, headers } = req;
  const session = await getSession({ req });
  switch (method) {
    case "GET": {
      try {
        const user = await User.findOne({ email: session?.user.email });
        res.status(200).json(user);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
