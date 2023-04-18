import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FetchHook from "../../hooks/FetchHook";
import { ProductI } from "../../models/products.interface";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState<ProductI>();
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState("");
  const id: any = "Products";
  const response: any = FetchHook(id);
  useEffect(() => {
    if (response) {
      let product = response?.data?.find(
        (res: ProductI) => res?.id === params.id || res?.title === params.id
      );
      setIsLoading(true);
      setIsLoading(false);
      setProduct(product);
      setErr("");
    } else {
      setIsLoading(false);
      setErr("Something went wrong");
    }
  }, [response]);
  if (isLoading)
    return (
      <p className="h-screen flex flex-col justify-center items-center text-2xl">
        Loading...
      </p>
    );
  return (
    <section className="flex flex-col gap-16 py-10 bg-gray-100">
      <div className="container mx-auto flex justify-around  items-center w-[80%]">
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
            Price: <span className="text-2xl">{product?.price}</span>
          </span>
          <span className="font-semibold">Brand: {product?.brand}</span>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Key features</h1>
            <p className="text-gray-800">{product?.description.slice(0, 35)}</p>
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
                {product?.rating.slice(0, 3)}
              </span>
              <span>{product?.rating.slice(3)}</span>
            </span>
          </h3>
          <button
            onClick={() => console.log("ksk")}
            className="bg-sky-500 text-sky-50 px-2 py-1 mt-4"
          >
            add to cart
          </button>
        </div>
      </div>
      <Link
        to="/product"
        className="text-xl py-1 text-center hover:text-cyan-500 duration-300 select-none"
      >
        &larr; Go to Product
      </Link>
    </section>
  );
};

export default ProductDetails;
