import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { calcTotal } from "../../redux/cart/slice";
import Input from "../Shared/Input";
const Summary = () => {
  const { t } = useTranslation("common");

  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calcTotal());
  }, [cart, dispatch]);
  const [shippingMethod, setShippingMethod] = useState(10);
  return (
    <div id="summary" className="w-1/4 px-8 py-10 bg-gray-300">
      <h1 className="font-semibold text-2xl border-b pb-8">
        {t("orderSummary")}
      </h1>
      <div className="flex justify-between mt-10 mb-5">
        <span className="font-semibold text-sm uppercase">
          {t("items")} {cart.items.length}
        </span>
        <span className="font-semibold text-sm">{cart.total}$</span>
      </div>
      <div>
        <label className="font-medium inline-block mb-3 text-sm uppercase">
          {t("shipping")}
        </label>
        <select
          className="block p-2 text-gray-600 w-full text-sm"
          value={shippingMethod}
          onChange={(e) => setShippingMethod(+e.target.value)}
        >
          <option value={10}> {t("standardShipping-$10.00")}</option>
          <option value={20}> {t("fastShipping-$20.00")}</option>
        </select>
      </div>
      <div className="py-10">
        <Input
          children={
            <label
              htmlFor="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
            >
              {t("promoCode")}
            </label>
          }
          id="promo"
          name="promo"
          type="text"
          placeholder="Enter your code"
          classes="p-2 text-sm w-full"
        />
        {/* <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full"> */}
      </div>
      <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
        {t("apply")}
      </button>
      <div className="border-t mt-8">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span> {t("totalCost")}</span>
          {cart.items.length && <span>${cart.total + shippingMethod}</span>}
        </div>
        <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
          {t("checkout")}
        </button>
      </div>
    </div>
  );
};

export default Summary;
