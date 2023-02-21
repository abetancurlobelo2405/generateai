import React from "react";
import { PaypalSubscriptionButton } from "../components/PaypalSuscriptions/index.js";
import Pricing from "../components/Pricing";
import { Main, PricingContainer } from "../styles/PricingElements.js";

const plans = {
  writerPlan: "P-5T91832665387253PMO7COWQ",
};

const PricingPage = () => {
  return (
    <Main>
      <PricingContainer>
        <Pricing planName={"FREE PLAN"}>
          This plan allows to create a normal history
          <ul>
            <li>3 chapters per history</li>
            <li>2 histories/day</li>
          </ul>
        </Pricing>

        <Pricing planName={"INTERMEDIATE"}>
          This plan allows to create a history with images - 10 chapters
        </Pricing>

        <Pricing planName={"PREMIUM PLAN"}>
          This plan allows to create a normal history - 25 chapters
        </Pricing>
      </PricingContainer>
    </Main>
  );
};

export default PricingPage;
