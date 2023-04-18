import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import DetailsPage from "./pages/DetailsPage";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import Product from "./pages/Product";

function App() {
  return (
    <section>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />

          {/* <Route path="/booking" element={<Booking />} />
          
          <Route path="/cart" element={<Cart />} /> */}
          <Route path="/:id" element={<DetailsPage />} />
          <Route path="/product/:id" element={<DetailsPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
      <Footer />
    </section>
  );
}

export default App;
