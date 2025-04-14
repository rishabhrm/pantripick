import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4567/api/orders/all-orders"
        );
        if (res.data.orders) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return <p className="text-center mt-6 text-gray-600">Loading...</p>;

  // Group orders by order_id
  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.order_id]) acc[order.order_id] = [];
    acc[order.order_id].push(order);
    return acc;
  }, {});

  const handleRemoveOrder = async (orderId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4567/api/orders/delete-orders/${orderId}`
      );
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.order_id !== orderId)
        );
      }
    } catch (error) {
      console.error("Error removing orders:", error);
      alert("Failed to remove order.");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen flex flex-col items-center bg-white text-black p-6">
        <h2 className="text-3xl font-bold mb-6">All Orders</h2>

        <div className="w-full max-w-5xl">
          {Object.keys(groupedOrders).length > 0 ? (
            Object.entries(groupedOrders).map(([orderId, items]) => (
              <div
                key={orderId}
                className="bg-white border border-gray-300 rounded-xl shadow-md p-6 mb-6"
              >
                <div className="mb-2">
                  <p className="font-semibold text-lg text-gray-800">
                    User:{" "}
                    <span className="font-normal">{items[0].user_name}</span>
                  </p>
                  <p className="text-gray-700">
                    Order ID: <span className="font-medium">{orderId}</span>
                  </p>
                  <p className="text-gray-700">
                    Date:{" "}
                    <span className="font-medium">
                      {new Date(items[0].created_at).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                <div className="mt-2 text-gray-700">
                  <p>
                    <strong>Items:</strong>{" "}
                    {items
                      .map((item) => `${item.product_name} (x${item.quantity})`)
                      .join(", ")}
                  </p>
                  <p>
                    <strong>Address:</strong> {items[0].address}
                  </p>
                  <p className="text-blue-600 font-semibold">
                    Status: Confirmed
                  </p>
                </div>

                <div className="mt-4 text-right">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
                    onClick={() => handleRemoveOrder(orderId)}
                  >
                    Remove All
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No past orders found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllOrders;
