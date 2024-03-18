import React, { useState } from "react";
import {
  FaStar,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import "../styles/Products.css";
import { Link } from "react-router-dom";

function Products({ title, data, db }) {
  const [horizontalScroll, setHorizontalScroll] = useState(true);
  function scroll(val) {
    const container = document.querySelector(`#${title.split(" ").join("")}`);
    container.scrollLeft = container.scrollLeft + val * 400;
  }

  function handleExpand(e) {
    const container = document.querySelector(".category-container");

    if (container.classList.contains("horizontal-scroll"))
      setHorizontalScroll(false);
    else setHorizontalScroll(true);
  }

  return (
    <div
      className={`category-container ${
        horizontalScroll && "horizontal-scroll"
      }`}
    >
      <div className="header">
        <h2>{title}</h2>
        <div className="buttons">
          <div className="icons">
            <button onClick={() => scroll(-1)}>
              <FaAngleLeft />
            </button>
            <button onClick={() => scroll(1)}>
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
      <section class="products" id={title.split(" ").join("")}>
        {data.map((product) => {
          const { title, img, rating, link, _id } = product;
          return (
            <Link
              to={{
                pathname: `/book/${db}/${_id}`,
                state: { id: _id, genre: db },
              }}
              p
            >
              <div className="product">
                <div className="img-container">
                  <img src={img} alt={title} />
                  <p className="rating">
                    <FaStar /> {rating === "Previous" ? "-.-" : rating}
                  </p>
                </div>
                <h4>{title}</h4>
              </div>
            </Link>
          );
        })}
      </section>
      <button className="toggle-expand" onClick={(e) => handleExpand(e)}>
        {horizontalScroll ? (
          <>
            Expand <FaAngleDown />
          </>
        ) : (
          <>
            Shrink <FaAngleUp />
          </>
        )}
      </button>
    </div>
  );
}

export default Products;
