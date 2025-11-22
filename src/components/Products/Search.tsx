import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQueryFetch } from "../../hooks/useFetch";
import { ProductI } from "../../models/products.interface";
import SingleProduct from "./SingleProduct";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [err, setErr] = useState("");
  const [catPath, setCatPath] = useState("");

  const categories = [
    "smartphone",
    "laptop",
    "smartwatch",
    "earbuds",
    "Keyboard",
    "graphics card",
  ];

  const id: any = "Products";
  const {
    data: response,
    isLoading,
    error,
  } = useQueryFetch({
    id,
    url: "http://localhost:4000/api/products",
    ...(catPath && {
      params: {
        filter: JSON.stringify({ category: catPath }),
      },
    }),
  });
  useEffect(() => {
    if (response) {
      setProducts(response?.data);
      setFilterProducts(response?.data);
      setErr("");
    } else {
      setErr(error as any);
    }
  }, [response, catPath]);

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
      <div className="flex lg:justify-between justify-center gap-10 flex-nowrap">
        <div className="lg:w-[20%] w-[80%] bg-gray-50 flex flex-col gap-3 px-3 pt-2">
          <h3
            className={`select-none cursor-pointer flex justify-between ${!catPath ? 'text-sky-400' : ''}`}

            onClick={() => {
              setCatPath("");
            }}
          >
            <span className="font-semibold">All Categories</span>
            <span>{!catPath ? `(${products?.length})` : ""}</span>
          </h3>
          {categories?.map((cat, i) => (
            <div
            className={`select-none cursor-pointer flex justify-between ${catPath === cat ? 'text-sky-400' : ''}`}
              key={i}
              onClick={() => {
                setCatPath(categories[i]);
              }}
            >
              <p className="cursor-pointer capitalize font-semibold">{cat}</p>
              <span>
                {catPath === cat ? `(${filterProducts?.length})` : ""}
              </span>
            </div>
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
