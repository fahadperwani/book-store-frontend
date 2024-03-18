import React from "react";
import useFetch from "../useFetch";
import Products from "./Products";

function Category({ title, db }) {
  const books = useFetch(`/genre/${db}`);
  return (
    <section className="category">
      {<Products title={title} data={books} db={db} />}
    </section>
  );
}

export default Category;
