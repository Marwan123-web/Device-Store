import React from "react";
import { OrderItem } from "../../models/Orders.interface";

const OrderItemCard = ({ orderItem }: { orderItem: OrderItem }) => {
  return (
    <div
      key={orderItem?.id}
      className="flex items-start space-x-6 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
    >
      <img
        src={orderItem?.product.img}
        alt={orderItem?.product.title}
        className="w-24 h-24 object-contain rounded-lg flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {orderItem?.product.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2 max-w-prose">
          {orderItem?.product.description.slice(0, 150)}...
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {orderItem?.product.category} • {orderItem?.product.brand}
          </span>
          <span className="font-semibold text-gray-900">
            ${orderItem?.product.price}
          </span>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-2xl font-bold text-gray-900">
          ${parseFloat(orderItem?.price) * orderItem?.quantity}
        </p>
        <p className="text-sm text-gray-500">Qty: {orderItem?.quantity}</p>
      </div>
    </div>
  );
};

export default OrderItemCard;
