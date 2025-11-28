import Herotext from "../Shared/Herotext";
import Summary from "./summary";
import { useSelector, useDispatch } from "react-redux";
import { ProductI } from "../../models/products.interface";
import Button from "../Shared/Button";
import { deleteItem, editItem } from "../../redux/cart/slice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CartItem from "./CartItem";
const Cart = () => {
  const { t } = useTranslation("common");

  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.items);
  if (!cart?.length) {
    return (
      <section>
        <Herotext text={"emptyCartPage"} bg={"cartbg"} />
      </section>
    );
  }
  return (
    <section>
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10 flex-wrap">
          <div className="lg:w-3/4 w-[100] bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">{t("shoppingCart")}</h1>
              <h2 className="font-semibold text-2xl">
                {cart?.length} {t("items")}
              </h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                {t("productDetails")}
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                {t("quantity")}
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                {t("price")}
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                {t("total")}
              </h3>
            </div>
            {cart.map((item: ProductI, index: number) => {
              return <CartItem key={index} cartItem={item} />;
            })}

            <Link
              to="/"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              {t("continueShopping")}
            </Link>
          </div>

          <Summary />
        </div>
      </div>
    </section>
  );
};

export default Cart;
