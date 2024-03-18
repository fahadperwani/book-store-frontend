import React, { useState } from "react";
import "../styles/Search.css";
import { FaSearch } from "react-icons/fa";
import useFetch from "../useFetch";
import SearchProducts from "./SearchProducts";

function Search() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(true);

  async function handleEnter(e) {
    if (e.key === "Enter") {
      console.log("Entered...");
      if (!show) setShow(true);
      if (value.length < 3) {
        setList([]);
        if (!error) setError(true);
      } else {
        if (error) setError(false);
        const resp = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${value}`
        );
        const result = await resp.json();
        let items = result.items;
        console.log(items);
        items.splice(4, 6);
        console.log(items);
        items = items.map((item) => {
          console.log(
            item.volumeInfo.averageRating &&
              item.volumeInfo.averageRating.toFixed(1)
          );
          return {
            link: item.selfLink,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors
              ? item.volumeInfo.authors[0]
              : "Anonymous",
            desc: item.volumeInfo.description || "",
            img:
              item.volumeInfo.imageLinks &&
              (item.volumeInfo.imageLinks.smallThumbnail ||
                item.volumeInfo.imageLinks.thumbnail),
            price: ("$" + Math.random() * 10).substring(0, 5),
            rating: item.volumeInfo.averageRating
              ? item.volumeInfo.averageRating.toFixed(1)
              : "-.-",
            reviews: item.volumeInfo.ratingsCount || "0",
          };
        });
        setList(items);
      }
    }
  }
  return (
    <>
      <div className="search">
        <h2>Explore</h2>
        <input
          type="text"
          placeholder="Find the book"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
        />
      </div>
      {show && (
        <main className="result">
          <h2>Result</h2>
          {error ? <h3>Enter valid input</h3> : <SearchProducts data={list} />}
        </main>
      )}
    </>
  );
}

export default Search;
