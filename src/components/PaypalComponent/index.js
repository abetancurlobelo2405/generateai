import React, { Children, useContext, useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PayPalContext from "../../context/PayPalContext";

export default function PayPalComponent({
  children,
  total,
  description,
  show,
}) {
  const { ConfirmationHandler, ValueHandler } = useContext(PayPalContext);
  return (
    <div>
      <>
        {children}
        {show ? (
          <PayPalScriptProvider
            options={{
              "client-id":
                "ASuUpd2VrGK1nNrVsxRBOIVXqR0SNRlYeg5Xa_1zjqmRosOYevYm3JdPJSYam2VUW2s8pvRCIuaUdk6g",
            }}
          >
            <div>
              <div>
                <PayPalButtons
                  disabled={false}
                  fundingSource={undefined}
                  createOrder={async (data, actions) => {
                    try {
                      const response = await fetch("/api/order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ total, description }),
                      });
                      const data = await response.json();
                      return data.id;
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  onCancel={(data) => console.log("compra cancelada")}
                  onApprove={async (data, actions) => {
                    try {
                      const value = await actions.order.capture();
                      ConfirmationHandler(true);
                      ValueHandler(
                        parseFloat(value.purchase_units[0].amount.value)
                      );
                    } catch (error) {
                      if (
                        error.message ===
                        "Can not send postrobot_method. Target window is closed"
                      ) {
                        console.log(
                          "The PayPal window was closed before the payment was completed"
                        );
                      } else {
                        console.error(error);
                      }
                    }
                  }}
                  style={{ layout: "vertical" }}
                />
              </div>
            </div>
          </PayPalScriptProvider>
        ) : undefined}
      </>
    </div>
  );
}
