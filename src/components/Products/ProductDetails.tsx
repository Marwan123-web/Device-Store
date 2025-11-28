import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQueryFetch } from "../../hooks/useFetch";
import { ProductI } from "../../models/products.interface";
import Button from "../Shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem } from "../../redux/cart/slice";
import Seo from "../Shared/Seo";
import { useTranslation } from "react-i18next";
import Loading from "../Shared/Loading";

const ProductDetails = () => {
  const { t } = useTranslation("common");
  const params = useParams();
  const [product, setProduct] = useState<ProductI>();
  const [err, setErr] = useState("");
  const id: any = "Products";
  const {
    data: response,
    isLoading,
    error,
  } = useQueryFetch({
    id,
    url: `products/${params.id}`,
  });
  useEffect(() => {
    if (response) {
      setProduct(response);
      setErr("");
    } else {
      setErr(error as any);
    }
  }, [response, params.id]);
  const cart = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  let foundInCart = cart?.find(
    (cartproduct: ProductI) => cartproduct?.id === product?.id
  );
  if (isLoading) return <Loading />;
  return (
    <>
      <Seo
        description={product?.description}
        title={product?.title}
        image={product?.img}
      />
      <section className="flex flex-col gap-16 py-10 bg-gray-100">
        <div className="container mx-auto flex justify-around  items-center w-[80%] lg:flex-nowrap flex-wrap">
          <div className="w-96 flex justify-end">
            <img
              src={product?.img}
              alt={product?.title}
              className="w-full select-none"
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-gray-500">
              {"Home/"}
              {<Link to="/product">product</Link>}
              {`/${product?.title}`}
            </p>
            <h2 className="text-4xl">{product?.title.slice(0, 30)}</h2>
            <span className="font-semibold">
              Price:{" "}
              <span className="text-2xl">
                {product?.price} {t("shared.usd")}
              </span>
            </span>
            <span className="font-semibold">Brand: {product?.brand}</span>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl">Key features</h1>
              <p className="text-gray-800">
                {product?.description.slice(0, 35)}
              </p>
              <p className="text-gray-800">
                {product?.description.slice(36, 70)}
              </p>
              <p className="text-gray-800">
                {product?.description.slice(71, 100)}
              </p>
              <p className="text-gray-800">
                {product?.description.slice(101, 130)}
              </p>
              <p className="text-gray-800">
                {product?.description.slice(131, 170)}
              </p>
              <p className="text-gray-800">
                {product?.description.slice(170, 201)}
              </p>
            </div>
            <h3 className="flex justify-between text-gray-700 text-lg">
              <span>Category: {product?.category}</span>
              <span>
                Rating:{" "}
                <span className="text-rose-500 font-bold">
                  {product?.rating}
                </span>
                <span>/5</span>
              </span>
            </h3>
            {!foundInCart && (
              <Button
                ButtonFun={() => dispatch(addItem(product as any))}
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
                      } as any)
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
                      } as any)
                    )
                  }
                />
              </div>
            )}{" "}
          </div>
        </div>
        <Link
          to="/product"
          className="text-xl py-1 text-center hover:text-cyan-500 duration-300 select-none"
        >
          &larr; Go to Product
        </Link>
      </section>
    </>
  );
};

export default ProductDetails;
