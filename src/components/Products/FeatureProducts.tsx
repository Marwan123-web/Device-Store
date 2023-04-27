import React from "react";
import useFetch from "../../hooks/useFetch";
import { ProductI } from "../../models/products.interface";
import SingleProduct from "./SingleProduct";

const FeatureProducts = () => {
  const id: any = "Products";
  const {
    data: products,
    loading,
    error,
  } = useFetch({
    id,
  });
  if (loading)
    return (
      <p className="h-screen flex flex-col justify-center items-center text-2xl">
        Loading...
      </p>
    );
  return (
    <section className="container mx-auto">
      <h2 className="text-4xl py-10 text-center font-medium text-gray-700">
        Feature Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-[80%] mx-auto pb-20">
        {products?.data
          ?.filter((product: ProductI) => +product?.id > 6)
          .map((product: ProductI) => {
            return <SingleProduct key={product.id} product={product} />;
          })}
      </div>
    </section>
  );
};

export default FeatureProducts;
