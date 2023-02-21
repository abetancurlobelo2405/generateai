import React from "react";
import { PricingCard } from "./PricingElements";

const Pricing = ({ planName, children }) => {
  return (
    <PricingCard>
      <p>{planName}</p>
      <>{children}</>
    </PricingCard>
  );
};

export default Pricing;
