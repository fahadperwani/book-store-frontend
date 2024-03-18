import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@stripe/stripe-js";
import Nav from "./components/Nav";
import Plans from "./pages/Plans";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import About from "./pages/About";
import SearchBook from "./pages/SearchBook";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/plans"
          element={
            <>
              <Nav /> <Plans />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Nav /> <Home />
            </>
          }
        />
        <Route
          path="/book/:genre/:id"
          element={
            <>
              <Nav /> <Book />
            </>
          }
        />
        <Route
          path="/apibook"
          element={
            <>
              <Nav /> <SearchBook />
            </>
          }
        />
        <Route
          path="/categories"
          element={
            <>
              <Nav /> <Categories />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Nav /> <Cart />
            </>
          }
        />
        <Route
          path="/aboutme"
          element={
            <>
              <Nav /> <About />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Nav /> <Login />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
