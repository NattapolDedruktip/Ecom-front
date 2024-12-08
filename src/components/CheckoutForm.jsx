import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "../stripe.css";
import useEcomStore from "../store/ecom-store";
import { saveOrder } from "../api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const token = useEcomStore((state) => state.token);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (payload.error) {
      setMessage(payload.error.message);
      toast.error(payload.error.message);
    } else if (payload.paymentIntent.status === "succeeded") {
      console.log("ready or saveOrder");
      //createOrder
      saveOrder(token, payload)
        .then((res) => {
          console.log(res);
          toast.success("Payment is completed !");
          navigate("/user/history");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("somethings wrong");
      toast.warning("Payment is incomplete ");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <>
      <form className="space-y-6" id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="stripe-button"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
