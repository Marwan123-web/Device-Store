import { Link } from "react-router-dom";
import { ProductI } from "../../models/products.interface";
import Button from "../Shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem } from "../../redux/cart/slice";
import { useTranslation } from "react-i18next";

const SingleProduct = ({ product }: { product: ProductI }) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { img, title, brand, price, id } = product;
  const cart = useSelector((state: any) => state.cart.items);

  let foundInCart = cart?.find(
    (cartproduct: ProductI) => cartproduct?.id === product?.id
  );
  return (
    <div className="single-product flex flex-col bg-gray-50 gap-3 shadow-md hover:shadow-xl hover:scale-105 duration-300 px-4 py-7 rounded-sm overflow-hidden">
      <div className="flex justify-center">
        <Link to={id+'/'+title}>
          <img
            className="w-72 h-48 object-contain hover:scale-110 duration-500"
            src={img}
            alt={title}
          />
        </Link>
      </div>
      <Link
        to={id+'/'+title}
        state={product}
        className="hover:text-rose-500 duration-300 flex justify-between items-center"
      >
        <h2 className="text-stone-950 font-semibold text-xl capitalize">
          {product.title.slice(0, 20)}
        </h2>
      </Link>
      <p className="text-sm text-gray-600">
        Brand: <span className="font-semibold capitalize">{brand}</span>
      </p>
      <p className="text-sm text-gray-600">
        Price: <span className="text-rose-500 font-semibold">{price} {t("shared.usd")}</span>
      </p>
      <div className="flex justify-between items-center">
        <Link
          to={id+'/'+title}
          state={product}
          className="hover:text-rose-50 text-gray-900 duration-300 flex justify-between items-center"
        >
          <Button
            label={"More Info"}
            classes={
              "text-sky-400 px-2 py-1 border border-sky-400 rounded-md hover:bg-sky-400 hover:text-sky-50 duration-300"
            }
          />
        </Link>
        {!foundInCart && (
          <Button
            ButtonFun={() => dispatch(addItem(product))}
            label={"add to cart"}
            classes={
              "bg-sky-400 text-sky-50 hover:bg-sky-50 hover:text-sky-400 duration-300 border border-sky-400 px-2 py-1 rounded-md"
            }
          />
        )}
        {foundInCart && (
          <div className="counter text-center">
            <Button
              label={"-"}
              classes={
                "bg-sky-400 text-sky-50 hover:bg-sky-50 hover:text-sky-400 duration-300 border border-sky-400 px-2 py-1 rounded-md mx-3"
              }
              ButtonFun={() =>
                dispatch(
                  editItem({
                    ...product,
                    method: "remove",
                  })
                )
              }
            />
            <span>{foundInCart?.quantity}</span>
            <Button
              label={"+"}
              classes={
                "bg-sky-400 text-sky-50 hover:bg-sky-50 hover:text-sky-400 duration-300 border border-sky-400 px-2 py-1 rounded-md mx-3"
              }
              ButtonFun={() =>
                dispatch(
                  editItem({
                    ...product,
                    method: "add",
                  })
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
