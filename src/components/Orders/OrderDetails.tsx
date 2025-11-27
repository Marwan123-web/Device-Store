// OrderDetails.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryFetch } from "../../hooks/useFetch";
import { Order, OrderItem } from "./Orders.interface";

interface OrderDetailsProps {
  order: Order;
  onBack: () => void;
}

const OrderDetails = () => {
  const params = useParams();

  const id: any = "order";
  const { data: order, isLoading } = useQueryFetch({
    id,
    url: `orders/${params?.id}`,
  });
  let subtotal;
  useEffect(() => {
    subtotal = order?.orderItems?.reduce(
      (sum: number, item: OrderItem) =>
        sum + parseFloat(item.price) * item.quantity,
      0
    );
  }, [order]);

  const onBack = () => {};
  if (isLoading)
    return (
      <p className="h-screen flex flex-col justify-center items-center text-2xl">
        Loading...
      </p>
    );
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-6"
          >
            ← Back to Orders
          </button>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Order #{order.id}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {order.status.toUpperCase()}
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                  Customer #{order.customerId}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Items
              </h2>
              <div className="space-y-4">
                {order?.orderItems.map((item: OrderItem) => (
                  <div
                    key={item.id}
                    className="flex items-start space-x-6 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <img
                      src={item.product.img}
                      alt={item.product.title}
                      className="w-24 h-24 object-contain rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.product.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2 max-w-prose">
                        {item.product.description.slice(0, 150)}...
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          {item.product.category} • {item.product.brand}
                        </span>
                        <span className="font-semibold text-gray-900">
                          ${item.product.price}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-bold text-gray-900">
                        ${parseFloat(item.price) * item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-lg p-8 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>${order.shippingCost}</span>
                </div>
                <div className="h-px bg-gray-200 my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-2xl text-green-600">
                    ${order.total}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping Method:</span>
                  <span>#SM{order.shippingMethodId}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Order Date:</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Last Updated:</span>
                  <span>{new Date(order.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="space-y-3">
                <button className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  Print Invoice
                </button>
                <button className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                  Track Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
