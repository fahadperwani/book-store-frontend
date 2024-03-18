import React from "react";
import Category from "../components/Category";
import "../styles/Categories.css";

const categories = [
  { title: "Romance", db: "romancebook" },
  { title: "SciFi", db: "scifibook" },
  { title: "Engineering", db: "engineeringbook" },
  { title: "Medical", db: "medicalbook" },
  { title: "Suspence And Thrill", db: "thrillbook" },
  { title: "Politics", db: "politicsbook" },
  { title: "Religion And Spirituality", db: "religiousbook" },
  { title: "History", db: "historybook" },
  { title: "Health And Fitness", db: "healthbook" },
  { title: "Technology", db: "computerbook" },
];
function Categories() {
  return (
    <main className="categories">
      <h1>Categories</h1>
      {categories.map((category) => (
        <Category title={category.title} db={category.db} />
      ))}
    </main>
  );
}

export default Categories;
