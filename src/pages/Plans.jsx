import React, { useState } from "react";
import { IoDiamondOutline, IoRocketOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import "../styles/Plans.css";
import StripeCheckout from "react-stripe-checkout";
import { useUserAuth } from "../context/AuthContext";

function Plans() {
  const { user, setPlan } = useUserAuth();
  console.log(user);

  async function makePayment(token, name) {
    const body = {
      token,
      product: { price: 10 },
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(process.env.REACT_APP_BACKEND_URL + "/stripe/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        setPlan(name);
        alert("Thank you for purchasing....");
      })
      .catch((err) => console.log(err));
  }

  return (
    <main className="plans">
      <h1>Plans</h1>
      <div className="cards">
        <div className="membership-card">
          <h2>monthly plan</h2>
          <IoRocketOutline className="m-icon" />
          <span>From</span>
          <h3>$5</h3>
          <div className="features">
            <p>
              <TiTick className="tick" /> Read Books Online
            </p>
            <p>
              <TiTick className="tick" /> Listen Audio Books Online
            </p>
          </div>
          <StripeCheckout
            token={
              !user
                ? () => alert("Please Sign in first")
                : (token) => makePayment(token, "Monthly Plan")
            }
            stripeKey="pk_test_51LbUVJB2VXbC0YGFJuqitsJgqEiseuhvQkIf38lJR76jSAGJ2OZ0gP4fGMc5EX8CQwhN3Tx2UR2xcRYGfzW0ii5a00DctERhMB"
            amount={500}
          >
            <button className="btn purchase-btn" disabled={user ? false : true}>
              Get it now
            </button>
          </StripeCheckout>
        </div>
        <div className="membership-card">
          <h2>yearly plan</h2>
          <IoDiamondOutline className="m-icon" />
          <span className="small">From</span>
          <h3>$50</h3>
          <div className="features">
            <p>
              <TiTick className="tick" /> Read Books Online
            </p>
            <p>
              <TiTick className="tick" /> Listen Audio Books Online
            </p>
          </div>
          <StripeCheckout
            token={(token) => makePayment(token, "Yearly Plan")}
            stripeKey="pk_test_51LbUVJB2VXbC0YGFJuqitsJgqEiseuhvQkIf38lJR76jSAGJ2OZ0gP4fGMc5EX8CQwhN3Tx2UR2xcRYGfzW0ii5a00DctERhMB"
            amount={5000}
          >
            <button className="btn purchase-btn" disabled={user ? false : true}>
              Get it now
            </button>
          </StripeCheckout>
        </div>
      </div>
    </main>
  );
}

export default Plans;
