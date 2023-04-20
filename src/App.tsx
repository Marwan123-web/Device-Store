import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import About from "./pages/About";
import CartPage from "./pages/Cart";
import ContactUs from "./pages/ContactUs";
import DetailsPage from "./pages/DetailsPage";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import Product from "./pages/Product";
import { useTranslation } from "react-i18next";
function App() {
  const { i18n } = useTranslation();

  const changeLang = () => {
    localStorage.setItem("lang", i18n.language == "en" ? "ar" : "en");
    i18n.changeLanguage(i18n.language == "en" ? "ar" : "en");
  };

  return (
    <section dir={i18n.language == "en" ? "ltr" : "rtl"}>
      <NavBar changeLangFun={changeLang} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />
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
