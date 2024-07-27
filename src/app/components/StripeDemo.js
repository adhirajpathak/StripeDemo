"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Here you would typically send the paymentMethod.id to your server
      console.log("PaymentMethod:", paymentMethod);
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return <div>Payment successful! Thank you for your purchase.</div>;
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="card-element">
          <CardElement />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={!stripe || loading}>
          {loading ? <span className="loading-spinner"></span> : "Pay"}
        </button>
      </form>
    </div>
  );
};

const StripeDemo = () => {
  return (
    <>
      <main>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </main>
    </>
  );
};

export default StripeDemo;
