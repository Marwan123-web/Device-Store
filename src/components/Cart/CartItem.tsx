import React from "react";
import { ProductI } from "../../models/products.interface";
import Button from "../Shared/Button";
import { deleteItem, editItem } from "../../redux/cart/slice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const CartItem = ({ cartItem }: { cartItem: ProductI }) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="w-20">
          <Link to={"/product/" + cartItem?.id + "/" + cartItem?.title}>
            <img className="h-24" src={cartItem?.img} alt="" />
          </Link>
        </div>
        <div className="flex flex-col justify-between lg:ml-4 ml-2 flex-grow">
          <span className="font-bold lg:text-sm text-xs">
            <Link to={"/product/" + cartItem?.id + "/" + cartItem?.title}>
              {cartItem?.title}
            </Link>
          </span>
          <span className="text-red-500 text-xs">{cartItem?.category}</span>
          <span
            className="font-semibold hover:text-red-500 text-gray-500 text-xs"
            onClick={() => dispatch(deleteItem(cartItem as any))}
          >
            {t("remove")}
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center w-1/5 lg:flex-row flex-col">
        <Button
          label={"-"}
          classes={
            "bg-sky-400 text-sky-50 hover:bg-sky-50 hover:text-sky-400 duration-300 border border-sky-400 px-2 py-1 rounded-md mx-3"
          }
          ButtonFun={() =>
            dispatch(
              editItem({
                ...cartItem,
                method: "remove",
              } as any)
            )
          }
        />
        <span>{cartItem?.quantity}</span>
        <Button
          label={"+"}
          classes={
            "bg-sky-400 text-sky-50 hover:bg-sky-50 hover:text-sky-400 duration-300 border border-sky-400 px-2 py-1 rounded-md mx-3"
          }
          ButtonFun={() =>
            dispatch(
              editItem({
                ...cartItem,
                method: "add",
              } as any)
            )
          }
        />
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">
        ${cartItem?.price}
      </span>
      <span className="text-center w-1/5 font-semibold text-sm">
        ${parseInt(cartItem?.price) * cartItem?.quantity}
      </span>
    </div>
  );
};

export default CartItem;
