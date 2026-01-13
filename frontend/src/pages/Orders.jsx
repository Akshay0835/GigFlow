import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders, updateOrderStatus } from "../store/slices/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const type = filter === "all" ? undefined : filter;
    dispatch(fetchMyOrders(type));
  }, [dispatch, filter]);

  const handleStatusUpdate = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  const statusStyles = {
    pending: "bg-yellow-400/20 text-yellow-300",
    "in-progress": "bg-blue-400/20 text-blue-300",
    completed: "bg-green-400/20 text-green-300",
    cancelled: "bg-red-400/20 text-red-300",
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-white">
            My Orders 📦
          </h1>
          <p className="text-gray-300 mt-2">
            Track your purchases and deliveries in one place
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {["all", "buyer", "seller"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-xl font-medium transition ${
                filter === type
                  ? "bg-gradient-to-r from-yellow-400 to-pink-500 text-gray-900"
                  : "bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20"
              }`}
            >
              {type === "all"
                ? "All Orders"
                : type === "buyer"
                ? "As Buyer"
                : "As Seller"}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {isLoading ? (
          <div className="text-center text-gray-300 py-20">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            No orders found
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const isSeller = order.seller._id === user._id;

              return (
                <div
                  key={order._id}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl"
                >
                  {/* TOP */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {order.gig.title}
                      </h3>
                      <p className="text-sm text-gray-300 mt-1">
                        {isSeller ? "Buyer" : "Seller"}:{" "}
                        <span className="font-medium">
                          {isSeller
                            ? order.buyer.username
                            : order.seller.username}
                        </span>
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">
                        ${order.price}
                      </div>
                      <span
                        className={`inline-block mt-2 px-4 py-1 rounded-full text-xs font-semibold ${
                          statusStyles[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* REQUIREMENTS */}
                  {order.requirements && (
                    <div className="mb-4 bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-sm text-gray-300 font-medium mb-1">
                        Requirements
                      </p>
                      <p className="text-sm text-gray-400">
                        {order.requirements}
                      </p>
                    </div>
                  )}

                  {/* FOOTER */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-400">
                    <div>
                      📅 Ordered:{" "}
                      {new Date(order.createdAt).toLocaleDateString()} &nbsp;
                      | &nbsp; 🚚 Delivery:{" "}
                      {new Date(order.deliveryDate).toLocaleDateString()}
                    </div>

                    {/* SELLER ACTIONS */}
                    {isSeller &&
                      order.status !== "completed" &&
                      order.status !== "cancelled" && (
                        <div className="flex gap-3">
                          {order.status === "pending" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(order._id, "in-progress")
                              }
                              className="px-4 py-2 rounded-lg bg-blue-500/80 text-white hover:bg-blue-600 transition"
                            >
                              Start Work
                            </button>
                          )}
                          {order.status === "in-progress" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(order._id, "completed")
                              }
                              className="px-4 py-2 rounded-lg bg-green-500/80 text-white hover:bg-green-600 transition"
                            >
                              Mark Complete
                            </button>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
