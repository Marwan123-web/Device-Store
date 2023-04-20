import FetchHook from "../../hooks/FetchHook";
import { Link, NavLink } from "react-router-dom";
import { LocalDataDI, LocalDataI } from "../../models/localData.interface";
import { FaShoppingCart } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const NavBar = ({ changeLangFun }: { changeLangFun: Function }) => {
  const id: any = "Navbar";
  const navs: any = FetchHook(id);
  const { t, i18n } = useTranslation("common");
  return (
    <div className="shadow-lg backdrop-blur-lg py-5 text-gray-900 bg-gray-50">
      <nav className="flex items-center container mx-auto justify-between">
        <div>
          <Link to="/" className="text-gray-700 italic text-7xl">
            DS
          </Link>
        </div>
        <ul className="list-none flex justify-center items-center gap-5">
          {navs?.data?.map((nav: LocalDataDI) => (
            <li key={nav.id}>
              <NavLink to={nav?.url}>
                {nav?.name === "Cart" ? <FaShoppingCart /> : t(nav?.name)}
              </NavLink>
            </li>
          ))}
          <li onClick={() => changeLangFun()}>
            <a className="lang-btn">
              {i18n.language === "en" ? t("Navbar.ar") : t("Navbar.en")}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
