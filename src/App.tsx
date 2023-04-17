import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <section>
      <NavBar />
      <main>
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="/:id" element={<ProductDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Notfound />} />
        </Routes> */}
      </main>
    </section>
  );
}

export default App;
