import React from "react";
import DynamicTable from "../Shared/Table";
import { Order } from "../../models/Orders.interface";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const OrderTable = ({ orders }: { orders: Order[] }) => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const customColumns = [
    {
      accessorKey: "id",
      header: "Order #",
      cell: (info: any) => `#${info.getValue()}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            info.getValue() === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "orderItems.length",
      header: "Order Items #",
      cell: (info: any) => `${info.getValue()}`,
    },
    {
      accessorKey: "shippingMethod.name",
      header: "Shipping Method",
      cell: (info: any) => `${info.getValue()}`,
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: (info: any) => `${info.getValue()} ${t("shared.usd")}`,
    },
    {
      accessorKey: "createdAt",
      header: "Creation Date",
      cell: (info: any) => new Date(info.getValue()).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <button
          onClick={() => handleViewDetails(row.original)}
          className="text-blue-600 hover:underline"
        >
          View Details
        </button>
      ),
    },
  ];
  const handleViewDetails = (order: any) => {
    navigate("/order/details/" + order.id);
  };
  return (
    <div>
      <DynamicTable
        data={orders}
        config={{ columns: customColumns, title: "Recent Orders" }}
      />{" "}
    </div>
  );
};

export default OrderTable;
