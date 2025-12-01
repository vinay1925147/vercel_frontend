import React, { useEffect, useState } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  // Mock fetch orders
  useEffect(() => {
    const mockOrders = [
      {
        id: "ORD001",
        customer: "Vinay Asati",
        date: "2025-10-31",
        status: "Pending",
        total: 2499,
      },
      {
        id: "ORD002",
        customer: "sachin Patel",
        date: "2025-10-29",
        status: "Delivered",
        total: 1899,
      },
      {
        id: "ORD003",
        customer: "Rahul Sharma",
        date: "2025-10-28",
        status: "Cancelled",
        total: 999,
      },
    ];
    setOrders(mockOrders);
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Admin Orders Management
      </h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Total (₹)</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.date}</td>
                <td
                  className={`p-3 font-medium ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="p-3 font-semibold">₹{order.total}</td>
                <td className="p-3 flex items-center justify-center gap-3">
                  <button className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition">
                    <FiEye size={18} />
                  </button>
                  <button className="p-2 text-red-500 hover:bg-red-100 rounded-full transition">
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
