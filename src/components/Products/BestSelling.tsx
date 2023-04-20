import React from "react";
import FetchHook from "../../hooks/FetchHook";
import { ProductI } from "../../models/products.interface";
import SingleProduct from "./SingleProduct";

const BestSelling = () => {
  const id: any = "Products";
  const products: any = FetchHook(id);
  return (
    <section className="container mx-auto">
      <h2 className="text-4xl py-10 text-center font-medium text-gray-700">
        Best Selling Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-[80%] mx-auto pb-20">
        {products?.data
          ?.filter((product: ProductI) => +product?.id <= 6)
          .map((product: ProductI) => {
            return <SingleProduct key={product.id} product={product} />;
          })}
      </div>
    </section>
  );
};

export default BestSelling;
