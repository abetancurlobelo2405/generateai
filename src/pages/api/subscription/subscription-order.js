import { getSession } from "next-auth/react";
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
  const { subscriptionID } = body;
  const session = await getSession({ req });

  if (req.method === "POST") {
    const subscriptionIsActive = await subscriptionDataHandler(subscriptionID);

    if (subscriptionIsActive) {
      const { id, plan_id, start_time, billing_info } = subscriptionIsActive;
      const { next_billing_time } = billing_info;

      const addMonth = (dateString) => {
        const date = new Date(dateString);
        date.setMonth(date.getMonth() + 1);
        return date.toISOString();
      };

      await User.updateOne(
        { email: session?.user?.email },
        {
          $set: {
            "plan.isSubscribed": true,
            "plan.isPaused": false,
            "plan.subscriptionDetails": {
              isFirstTime: true,
              subscriptionID: id,
              planId: plan_id,
              startDate: start_time,
              endDate: addMonth(start_time),
              nextBillingDate: next_billing_time,
              renewal: true,
              renewalCanceledAt: null,
              subscriptionCanceledAt: null,
            },
          },
        }
      );
    }
  } else {
    return res.status(401).json({ sucess: false });
  }
  res.status(200).json({ sucess: false });
}
