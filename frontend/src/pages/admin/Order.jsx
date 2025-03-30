import React from "react";

const orders = [
  { id: "OD001", items: "Amul Cheese Block - Qty: 1, Quaker Rolled Oats - Qty: 2", quantity: 3, cost: "₹720", recipient: "Rishabh" },
  { id: "OD002", items: "Amul Cheese Block - Qty: 1, Quaker Rolled Oats - Qty: 2", quantity: 2, cost: "₹57", recipient: "Ankit" },
  { id: "OD003", items: "Amul Cheese Block - Qty: 1, Quaker Rolled Oats - Qty: 2", quantity: 4, cost: "₹40", recipient: "Shailendra" },
  { id: "OD004", items: "Amul Cheese Block - Qty: 1, Quaker Rolled Oats - Qty: 2", quantity: 1, cost: "₹50", recipient: "Lakshya" },
  { id: "OD005", items: "Amul Cheese Block - Qty: 1, Quaker Rolled Oats - Qty: 1", quantity: 3, cost: "₹70", recipient: "Raj" },
  { id: "OD006", items: "Amul Cheese Block - Qty: 1, Quaker Rolled Oats - Qty: 2", quantity: 1, cost: "₹20", recipient: "Anu" },
];

const AllOrders = () => {
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center relative p-6"
      style={{ backgroundImage: "url('/Image/orders-bg.jpg')" }}>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Orders Container */}
      <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-3xl shadow-lg w-full max-w-5xl">
        <h2 className="text-center text-2xl font-bold uppercase mb-6 text-gray-800">All Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="p-3">Order ID</th>
                <th className="p-3">Items</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Cost</th>
                <th className="p-3">Recipient</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-b hover:bg-gray-100 transition">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.items}</td>
                  <td className="p-3">Total Items: {order.quantity}</td>
                  <td className="p-3">{order.cost}</td>
                  <td className="p-3">{order.recipient}</td>
                  <td className="p-3">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
