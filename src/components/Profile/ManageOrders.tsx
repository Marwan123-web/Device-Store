import React from "react";
import { useTranslation } from "react-i18next";
import { useQueryFetch } from "../../hooks/useFetch";
import Loading from "../Shared/Loading";
import OrderTable from "../Orders/OrderTable";

const ManageOrders = () => {
  const { i18n } = useTranslation();
  const id: any = "orders";
  const { data: orders, isLoading } = useQueryFetch({
    id,
    url: "orders/all",
  });
  if (isLoading) return <Loading />;
  return <div>{orders && <OrderTable orders={orders} />}</div>;
};

export default ManageOrders;
