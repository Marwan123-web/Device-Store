import FetchHook from "../../hooks/FetchHook";
import { Link, NavLink } from "react-router-dom";
import { LocalDataDI, LocalDataI } from "../../models/localData.interface";
import { FaShoppingCart } from "react-icons/fa";

const NavBar = () => {
  const id: any = "Navbar";
  const navs: any = FetchHook(id);
  return (
    <div className="shadow-lg backdrop-blur-lg py-5 text-gray-900 bg-gray-50">
      <nav className="flex items-center container mx-auto">
        <div>
          <Link to="/" className="text-gray-700 italic text-7xl">
            DS
          </Link>
        </div>
        <ul className="list-none flex justify-center items-center ml-auto gap-5">
          {navs?.data?.map((nav: LocalDataDI) => (
            <li key={nav.id}>
              <NavLink to={nav?.url}>
                {nav?.name === "Cart" ? <FaShoppingCart /> : nav?.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
