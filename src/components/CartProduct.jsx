import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useStateValue } from "../context/StateProvider";
import { useUserAuth } from "../context/AuthContext";
import StripeCheckout from "react-stripe-checkout";

function CartProduct({ item, makePayment }) {
  const { title, img, desc, reviews, price, rating, author, genre, idx } = item;
  const [{ basket }, dispatch] = useStateValue();
  const { user } = useUserAuth();
  const priceForPayment = price.substring(1);

  function handleRemove(item) {
    dispatch({ type: "REMOVE_FROM_BASKET", item });
  }
  if (genre) {
    const { id } = item;
    return (
      <div className="cart-product">
        <Link to={{ pathname: `/book/${genre}/${id}`, state: { id, genre } }}>
          <img src={img} alt="" />
        </Link>
        <div className="product-info">
          <h3>{title}</h3>
          <h4>{author}</h4>
          <div className="rating">
            <p id="rating">
              <FaStar />
              {rating === "" ? "-.-" : rating}
              <span className="count">{reviews}</span>
            </p>
          </div>
          <p className="price">{price}</p>
          <button
            className="btn remove-btn"
            onClick={() => handleRemove({ ...item, idx })}
          >
            Remove From Cart
          </button>
          <StripeCheckout
            token={(token) =>
              makePayment(token, "REMOVE_FROM_BASKET", { ...item, idx })
            }
            amount={priceForPayment * 100}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
          >
            <button className="btn buy-btn" disabled={user ? false : true}>
              Buy
            </button>
          </StripeCheckout>
        </div>
      </div>
    );
  } else {
    const { link } = item;
    return (
      <div className="cart-product">
        <Link to={`/apibook?url=${link}`}>
          <img src={img} alt="" />
        </Link>
        <div className="product-info">
          <h3>{title}</h3>
          <h4>{author}</h4>
          <div className="rating">
            <p id="rating">
              <FaStar />
              {rating === "" ? "-.-" : rating}
              <span className="count">{reviews}</span>
            </p>
          </div>
          <p className="price">{price}</p>
          <button
            className="btn remove-btn"
            onClick={() => handleRemove({ ...item, idx })}
          >
            Remove From Cart
          </button>
          <StripeCheckout
            token={(token) => makePayment(token, "REMOVE_FROM_BASKET", item)}
            amount={priceForPayment * 100}
            stripeKey="pk_test_51LbUVJB2VXbC0YGFJuqitsJgqEiseuhvQkIf38lJR76jSAGJ2OZ0gP4fGMc5EX8CQwhN3Tx2UR2xcRYGfzW0ii5a00DctERhMB"
          >
            <button className="btn buy-btn" disabled={user ? false : true}>
              Buy
            </button>
          </StripeCheckout>
        </div>
      </div>
    );
  }
}

export default CartProduct;
