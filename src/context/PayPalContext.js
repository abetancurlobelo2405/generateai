import { createContext, useState } from "react";

const PayPalContext = createContext();

const PayPalProvider = ({ children }) => {
  const [isPaid, setIsPaid] = useState(false);
  const [value, setValue] = useState(0);

  const ConfirmationHandler = (isPayment) => {
    if (isPayment) {
      setIsPaid(true);
    } else {
      setIsPaid(false);
    }
  };

  const ValueHandler = (value) => {
    setValue(value);
  };

  const data = { isPaid, value, ConfirmationHandler, ValueHandler };

  return (
    <PayPalContext.Provider value={data}>{children}</PayPalContext.Provider>
  );
};

export { PayPalProvider };
export default PayPalContext;
