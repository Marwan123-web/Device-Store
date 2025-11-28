import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { calcTotal, resetCart } from "../../redux/cart/slice";
import Input from "../Shared/Input";
import { useMutationFetch, useQueryFetch } from "../../hooks/useFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ShippingMethod } from "../../models/Orders.interface";
const Summary = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calcTotal());
  }, [cart, dispatch]);
  const [shippingMethod, setShippingMethod] = useState<
    ShippingMethod | undefined
  >();

  const id: any = "shipping";
  const { data: shippingMethods, isLoading } = useQueryFetch({
    id,
    url: "shipping",
  });
  useEffect(() => {
    if (shippingMethods?.length) {
      setShippingMethod(shippingMethods[0]);
    }
  }, [shippingMethods]);

  const selectShippingMethod = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id = Number(event.target.value);
    const selected = shippingMethods?.find((m: ShippingMethod) => m.id === id);
    setShippingMethod(selected);
  };

  const mutation = useMutationFetch({
    url: "orders",
    method: "POST",
  });

  const handleSubmit = () => {
    if (!shippingMethod?.id) {
      toast.error("You have to select shipping method");
    }
    const items = cart?.items.map((item: any) => {
      return {
        productId: item.id,
        quantity: item.quantity,
      };
    });

    mutation.mutate(
      { shippingMethodId: shippingMethod?.id, orderItems: items },
      {
        onSuccess: (data) => {
          dispatch(resetCart());
          navigate("/thankyou");
          toast.success(t("orders.thankyou"));
        },
        onError: (error: any) => {
          console.error("Login failed:", error);
        },
      }
    );
  };
  return (
    <div id="summary" className="lg:w-1/4 w-[100] px-8 py-10 bg-gray-300">
      <h1 className="font-semibold text-2xl border-b pb-8">
        {t("orderSummary")}
      </h1>
      <div className="flex justify-between mt-10 mb-5">
        <span className="font-semibold text-sm uppercase">
          {t("items")} {cart?.items?.length}
        </span>
        <span className="font-semibold text-sm">{cart?.total}$</span>
      </div>
      <div>
        <label className="font-medium inline-block mb-3 text-sm uppercase">
          {t("shipping")}
        </label>
        <select
          className="block p-2 text-gray-600 w-full text-sm"
          value={shippingMethod?.id ?? ""}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            selectShippingMethod(event);
          }}
        >
          {shippingMethods?.map((method: ShippingMethod) => (
            <option value={method.id} key={method.id}>
              {method.name}-{method.price}$
            </option>
          ))}
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
          {cart?.items?.length && (
            <span>${cart?.total + +(shippingMethod?.price || 0)}</span>
          )}
        </div>
        <button
          className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
          onClick={handleSubmit}
        >
          {t("checkout")}
        </button>
      </div>
    </div>
  );
};

export default Summary;
