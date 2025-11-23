import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import "flowbite";
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
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProfileSideNav from "./components/Profile/ProfileSideNav";
import { useSelector } from "react-redux";
function App() {
  const { i18n } = useTranslation();

  const changeLang = () => {
    localStorage.setItem("lang", i18n.language === "en" ? "ar" : "en");
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  const location = useLocation();

  const excludedRoutes = ['/login', '/register']; // routes to hide header/footer

  const shouldShowHeaderFooter = !excludedRoutes.includes(location.pathname);

  const user = useSelector((state: any) => state.user);  
  return (
    <section dir={i18n.language === "en" ? "ltr" : "rtl"}>
      { shouldShowHeaderFooter && <NavBar changeLangFun={changeLang} /> }
      <main className="main-padding">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/:id" element={<DetailsPage />} />
          <Route path="/product/:id" element={<DetailsPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={user?.email ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/register" element={user?.email  ? <Navigate to="/" replace /> : <Register /> } />
          <Route path="/profile" element={!user?.email  ? <Navigate to="/login" replace /> : <ProfileSideNav />} />
          <Route path="/404" element={<Notfound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      { shouldShowHeaderFooter && <Footer /> }
    </section>
  );
}

export default App;
