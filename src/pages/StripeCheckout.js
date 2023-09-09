import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectOrderSuccess } from "../features/orders/ordersSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51NmxI3I7qY0ytqpso3M5ZzeFhDRK70s4C8fpsRohW9pbMEaHZEZDp0kj4oaCtsqDL1ZnfdA5oBfIL8TzeaRNz31Y006R2cwId8"
);

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  // const currentOrder = useSelector(selectSelectedOrder);
  const orderSuccess = useSelector(selectOrderSuccess);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalAmount: orderSuccess.totalAmount,
        orderId: orderSuccess.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [orderSuccess]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
