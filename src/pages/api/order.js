import paypal from "@paypal/checkout-server-sdk";
// Creating an environment
let clientId =
  "ASuUpd2VrGK1nNrVsxRBOIVXqR0SNRlYeg5Xa_1zjqmRosOYevYm3JdPJSYam2VUW2s8pvRCIuaUdk6g";
let clientSecret =
  "EPUdY4XnU9Tr2Y5W6Dl6j3PBkEq52EPo7Ueg_RJLx8kklgxDF_XvsUd_73XOfpF2z3yRMwEta-rbUWkN";

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default async function handler(req, res) {
  const { body } = req;
  console.log(body);
  if (req.method === "POST") {
    let response = undefined;
    try {
      const request = new paypal.orders.OrdersCreateRequest();

      request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: body.total.toString(),
            },
          },
        ],
      });
      response = await client.execute(request);
    } catch (error) {
      console.log(error);
    }
    return res.json({ id: response.result.id });
  }
}
