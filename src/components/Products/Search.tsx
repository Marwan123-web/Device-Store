import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FetchHook from "../../hooks/FetchHook";
import { ProductI } from "../../models/products.interface";
import SingleProduct from "./SingleProduct";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState("");
  const [catPath, setCatPath] = useState("all categories");

  const categories = [
    "smartphone",
    "laptop",
    "smartwatch",
    "earbuds",
    "Keyboard",
    "graphics card",
  ];

  const id: any = "Products";
  const response: any = FetchHook(id);
  useEffect(() => {
    if (response) {
      setIsLoading(true);
      setIsLoading(false);
      setProducts(response?.data);
      setFilterProducts(response?.data);
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
  if (err)
    return (
      <p className="h-screen flex flex-col justify-center items-center text-2xl">
        <span>{err}</span>
        <Link to="/product" className="text-lg text-gray-500 font-semibold">
          &larr;Refresh page
        </Link>
      </p>
    );
  return (
    <div className="container mx-auto pb-20">
      <h2 className="text-center text-3xl py-10">All Products</h2>
      <div className="flex justify-between gap-10">
        <div className="w-[20%] bg-gray-50 flex flex-col gap-3 px-3 pt-2">
          <h3
            className="select-none cursor-pointer flex justify-between"
            onClick={() => {
              setFilterProducts(products);
              setCatPath("all categories");
            }}
          >
            <span className="font-semibold">All Categories</span>
            <span>{`(${products?.length})`}</span>
          </h3>
          {categories?.map((cat, i) => (
            <p
              className="select-none cursor-pointer capitalize font-semibold"
              key={i}
              onClick={() => {
                const filters = products.filter(
                  (product: ProductI) => product.category === cat
                );
                setFilterProducts(filters);
                setCatPath(categories[i]);
              }}
            >
              <span>
                {cat} {catPath === cat ? `(${filterProducts?.length})` : ""}
              </span>
            </p>
          ))}
        </div>
        <div>
          <p className="text-gray-500 pb-4">
            {<Link to="/">Home </Link>}/
            <span className="text-sky-400 px-1">{catPath}</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
            {filterProducts &&
              filterProducts.map((product: ProductI) => (
                <SingleProduct key={product.id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
