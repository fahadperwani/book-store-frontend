import { FaStar, FaShoppingCart } from "react-icons/fa";
import "../styles/Book.css";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { useEffect, useRef, useState } from "react";
import useFetch from "../useFetch";
import { useUserAuth } from "../context/AuthContext";

function SearchBook() {
  const { search } = useLocation();
  const { url } = queryString.parse(search);
  const [{ idx }, dispatch] = useStateValue();
  const [data, setData] = useState({});
  const { user } = useUserAuth();
  const descRef = useRef();

  useEffect(() => {
    async function getData() {
      const resp = await fetch(url);
      const result = await resp.json();

      const book = {
        id: Date.now(),
        link: result.selfLink,
        title: result.volumeInfo.title,
        author: result.volumeInfo.authors
          ? result.volumeInfo.authors[0]
          : "Anonymous",
        desc: result.volumeInfo.description || "No description Found",
        img:
          result.volumeInfo.imageLinks &&
          (result.volumeInfo.imageLinks.thumbnail ||
            result.volumeInfo.imageLinks.smallThumbnail),
        price: ("$" + Math.random() * 10).substring(0, 5),
        rating: result.volumeInfo.averageRating
          ? result.volumeInfo.averageRating.toFixed(1)
          : "-.-",
        reviews: result.volumeInfo.ratingsCount || "0",
      };
      descRef.current.innerHTML =
        result.volumeInfo.description || "No description Found";
      setData(book);
    }

    getData();
  }, []);

  const { link, title, author, desc, img, price, rating, reviews } = data;

  function addItem() {
    dispatch({
      type: "ADD_TO_BASKET",
      item: { title, img, desc, reviews, price, rating, author, link, idx },
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
              <span className="count">{reviews + " reviews"}</span>
            </p>
          </div>
          <div className="inline-style">
            <div className="purchase">
              <div className="price">
                <h3>Price</h3>
                {price}
              </div>
              <FaShoppingCart className="cart-icon" onClick={addItem} />
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
        <p ref={descRef}></p>
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
    // <><h1>Book</h1></>
  );
}

export default SearchBook;
