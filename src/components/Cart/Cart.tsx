import Herotext from "../Shared/Herotext";
import Summary from "./summary";
import { useSelector, useDispatch } from "react-redux";
import { ProductI } from "../../models/products.interface";
import Button from "../Shared/Button";
import { deleteItem, editItem } from "../../redux/cart/slice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Cart = () => {
  const { t } = useTranslation("common");

  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.items);
  if (!cart.length) {
    return (
      <section>
        <Herotext text={"Cart Page"} bg={"cartbg"} />
      </section>
    );
  }
  return (
    <section>
      <Herotext text={"Cart Page"} bg={"cartbg"} />
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">{t("shoppingCart")}</h1>
              <h2 className="font-semibold text-2xl">
                {cart.length} {t("items")}
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
            {cart.map((item: ProductI, index: number) => (
              <div
                className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                key={index}
              >
                <div className="flex w-2/5">
                  <div className="w-20">
                    <Link to={"/product/" + item.title}>
                      <img className="h-24" src={item.img} alt="" />
                    </Link>
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">
                      <Link to={"/product/" + item.title}>{item.title}</Link>
                    </span>
                    <span className="text-red-500 text-xs">
                      {item.category}
                    </span>
                    <span
                      className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                      onClick={() => dispatch(deleteItem(item as any))}
                    >
                      {t("remove")}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <Button
                    label={"-"}
                    classes={
                      "bg-sky-400 text-sky-50 hover:bg-sky-50 hover:text-sky-400 duration-300 border border-sky-400 px-2 py-1 rounded-md mx-3"
                    }
                    ButtonFun={() =>
                      dispatch(
                        editItem({
                          ...item,
                          method: "remove",
                        } as any)
                      )
                    }
                  />
                  <span>{item?.quantity}</span>
                  <Button
                    label={"+"}
                    classes={
                      "bg-sky-400 text-sky-50 hover:bg-sky-50 hover:text-sky-400 duration-300 border border-sky-400 px-2 py-1 rounded-md mx-3"
                    }
                    ButtonFun={() =>
                      dispatch(
                        editItem({
                          ...item,
                          method: "add",
                        } as any)
                      )
                    }
                  />
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${item.price}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${parseInt(item.price) * item.quantity}
                </span>
              </div>
            ))}

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
