import { useParams } from "react-router-dom";
import queryString from "query-string";
import useFetch from "../useFetch";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import "../styles/Book.css";
import { useStateValue } from "../context/StateProvider";
import { useUserAuth } from "../context/AuthContext";
import StripeCheckout from "react-stripe-checkout";

function Book() {
  const [{ idx }, dispatch] = useStateValue();
  const { id, genre } = useParams();
  const { title, img, desc, reviews, price, rating, author } = useFetch(
    process.env.REACT_APP_BACKEND_URL + `/genre/${genre}/${id}`
  );
  const { user } = useUserAuth();

  function addItem() {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        title,
        img,
        desc,
        reviews,
        price,
        rating,
        author,
        genre,
        id,
        idx,
      },
    });
  }

  function openNewTab() {
    window.open(
      "http://www.passuneb.com/elibrary/ebooks/Harry%20Potter%20and%20The%20Sorcerer%E2%80%99s%20Stone.pdf",
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <section className="book">
      <div className="book-header">
        <img src={img} alt="" />
        <div className="info">
          <h1>{title}</h1>
          <p className="author">{author}</p>
          <div className="rating">
            <p id="rating">
              <FaStar />
              {rating === "" ? "-.-" : rating}
              <span className="count">{reviews}</span>
            </p>
          </div>
          <div className="inline-style">
            <div className="purchase">
              <div className="price">
                <h3>Price</h3>
                {price}
              </div>
              <FaShoppingCart
                className="cart-icon"
                onClick={price !== "Not Found" ? addItem : undefined}
              />
            </div>
            <button
              className="btn add-btn"
              onClick={price !== "Not Found" ? addItem : undefined}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="desc">
        <h2>Description</h2>
        <p>{desc}</p>
      </div>
      <div className="after-plan">
        <button
          className="btn read-btn"
          disabled={user?.plan ? false : true}
          onClick={openNewTab}
        >
          Read Book
        </button>
        <button className="btn listen-btn" disabled={user?.plan ? false : true}>
          Play Audio Book
        </button>
      </div>
    </section>
  );
}

export default Book;
