import React from "react";
import { useTranslation } from "react-i18next";
import { useQueryFetch } from "../../hooks/useFetch";
import OrderTable from "../Orders/OrderTable";
import Loading from "../Shared/Loading";

const Orders = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { t } = useTranslation("common");
  const id: any = "orders";
  const { data: orders, isLoading } = useQueryFetch({
    id,
    url: "orders",
  });
  if (isLoading) return <Loading />;
  return <div>{orders && <OrderTable orders={orders} />}</div>;
};

export default Orders;
