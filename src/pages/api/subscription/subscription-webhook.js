import User from "../../../models/User";

// This function only allows paypal request webhooks, this is for security.
const webhookHandler = async (req) => {
  const url =
    "https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature";
  console.log("???");
  const bodyValues = {
    transmission_id: req.headers["paypal-transmission-id"],
    transmission_time: req.headers["paypal-transmission-time"],
    cert_url: req.headers["paypal-cert-url"],
    auth_algo: "SHA256withRSA",
    transmission_sig: req.headers["paypal-transmission-sig"],
    webhook_id: "22E80802RW6827106",
    webhook_event: req.body,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(
        `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.NEXT_PUBLIC_PAYPAL_SECRET}`
      )}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyValues),
  });
  const data = await response.json();
  console.log(data);
  if (data.verification_status === "SUCCESS") {
    return true;
  } else {
    return false;
  }
};

const subscriptionDetailsHandler = async (subscriptionID) => {
  try {
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
    const paypalSubscriptionDetail = await response.json();
    return paypalSubscriptionDetail;
  } catch (error) {
    console.log(error);
  }
};

// Paypal function webhook, this handles "Payment sale completed" and "Billing subscription suspended"
async function PaypalSubscriptionWebhook(req, res) {
  switch (req.method) {
    case "POST":
      const isPaypalSecuredRequest = await webhookHandler(req);
      try {
        if (isPaypalSecuredRequest) {
          console.log("request", req.body.event_type);

          if (req.body.event_type === "PAYMENT.SALE.ACTIVATED") {
            // si el usuario activo denuevo su subscripcion se pone null todo lo q de cancelacion
          }

          if (req.body.event_type === "PAYMENT.SALE.COMPLETED") {
            const query = {
              "plan.subscriptionDetails.subscriptionID":
                req.body.resource.billing_agreement_id,
            };
            const getUser = await User.findOne(query);

            if (
              getUser?.plan?.subscriptionDetails?.isFirstTime === true ||
              !getUser?.plan?.subscriptionDetails?.renewal
            ) {
              const update = {
                $set: { "plan.subscriptionDetails.isFirstTime": false },
              };
              const user = await User.findOneAndUpdate(query, update, {
                new: true, // returns the updated document
              });
              console.log(user);
              console.log("si funfo, el usuario tiene renewal false xd");
              res.status(200).json({ success: true });
            } else {
              const addMonth = (dateString) => {
                const date = new Date(dateString);
                date.setMonth(date.getMonth() + 1);
                return date.toISOString();
              };

              const paypalSubscriptionDetail = await subscriptionDetailsHandler(
                req.body.resource.billing_agreement_id
              );

              const update = {
                $set: {
                  "plan.subscriptionDetails.startDate":
                    paypalSubscriptionDetail.start_time,

                  "plan.subscriptionDetails.endDate": addMonth(
                    getUser.plan.subscriptionDetails.endDate
                  ),
                  "plan.subscriptionDetails.nextBillingDate":
                    paypalSubscriptionDetail.billing_info.next_billing_time,
                },
              };
              const user = await User.findOneAndUpdate(query, update, {
                new: true,
              });
              console.log(user);
              res.status(200).json({ success: true });
            }
          }

          if (req.body.event_type === "BILLING.SUBSCRIPTION.SUSPENDED") {
            try {
              const dateConverter = () => {
                const currentDate = Date.now();
                const date = new Date(currentDate);
                return date.toISOString();
              };
              // Aqui manejamos la suspension de la subscripcion.

              const query = {
                "plan.subscriptionDetails.subscriptionID": req.body.resource.id,
              };
              const getUser = await User.findOne(query);

              const update = {
                $set: {
                  "plan.subscriptionDetails.renewal": false,
                  "plan.subscriptionDetails.renewalCanceledAt": dateConverter(),
                  "plan.subscriptionDetails.subscriptionCanceledAt":
                    getUser.plan.subscriptionDetails.endDate,
                },
              };
              const user = await User.findOneAndUpdate(query, update, {
                new: true,
              });
              console.log(user);
              res.status(200).json({ success: true });
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          res.status(401).json({ success: false });
        }
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      console.log(`Received an unsupported ${req.method} request`);
      res.status(405).end();
      break;
  }
}

export default PaypalSubscriptionWebhook;
