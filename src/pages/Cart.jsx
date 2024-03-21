import React from "react";
import CartProduct from "../components/CartProduct";
import { useStateValue } from "../context/StateProvider";
import StripeCheckout from "react-stripe-checkout";
import "../styles/Cart.css";
import { useEffect, useState } from "react";
import { useUserAuth } from "../context/AuthContext";

function Cart() {
  const [{ basket }, dispatch] = useStateValue();
  const { user } = useUserAuth();
  const [total, setTotal] = useState(0);

  const product = { price: total * 100 };

  async function makePayment(token, actionType, item) {
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
        dispatch({ type: actionType, item });
        alert("Thank you for purchasing..");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    let value = 0;
    basket.forEach(
      (item) => (value += parseFloat(item.price.substring(1)) || 0)
    );
    setTotal(value.toFixed(2));
  }, [basket]);

  console.log(total);

  return (
    <main className="cart">
      <h1>Cart</h1>
      {basket.length === 0 && <h2>Your basket is empty</h2>}
      <div className="cart-products">
        {basket.map((item, idx) => (
          <CartProduct item={item} makePayment={makePayment} idx={idx} />
        ))}
      </div>
      {basket.length > 0 && (
        <div className="checkout">
          <h3>Sub Total: ${total}</h3>
          <StripeCheckout
            token={(token) => makePayment(token, "EMPTY_BASKET")}
            amount={total * 100}
            stripeKey="pk_test_51LbUVJB2VXbC0YGFJuqitsJgqEiseuhvQkIf38lJR76jSAGJ2OZ0gP4fGMc5EX8CQwhN3Tx2UR2xcRYGfzW0ii5a00DctERhMB"
          >
            <button className="to-checkout" disabled={user ? false : true}>
              {user ? "Proceed to check out" : "Sign to proceed"}
            </button>
          </StripeCheckout>
        </div>
      )}
    </main>
  );
}

export default Cart;
