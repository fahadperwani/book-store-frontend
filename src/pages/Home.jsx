import React from "react";
import Search from "../components/Search";
import Products from "../components/Products";
import useFetch from "../useFetch";
import "../styles/Home.css";

function Home() {
  const bestSeller = useFetch("/genre/bestsellers");
  const newRelease = useFetch("/genre/newrelease");
  return (
    <section className="home">
      <Search />
      <main>
        <Products title={"Best Seller"} data={bestSeller} db="bestseller" />
        <Products title={"New Release"} data={newRelease} db="newrelease" />
      </main>
    </section>
  );
}

export default Home;
