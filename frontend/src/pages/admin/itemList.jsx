import { useState } from "react";
import { assets } from '../../assets/assets';

const ItemList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([
    { id: 1, name: "Amul Cheese", qty: 36, price: 70, img: assets.AmulCheeseBlock },
    { id: 2, name: "Oats", qty: 92, price: 57, img: assets.Oats },
    { id: 3, name: "Amul Masti Dahi", qty: 15, price: 150, img: assets.Dahi },
    { id: 4, name: "Eggs", qty: 32, price: 77, img: assets.Eggs },
    { id: 5, name: "Britannia Brown Bread", qty: 17, price: 50, img: assets.Bread },
    { id: 6, name: "Good Day Biscuits", qty: 10, price: 100, img: assets.Biscuits },
    { id: 7, name: "Honey Corn Flakes", qty: 32, price: 77, img: assets.Kelloggs },
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black p-6">
      <h2 className="text-2xl font-bold mb-4">Item List</h2>
      <input
        type="text"
        placeholder="Search..."
        className="p-2 border rounded w-80 mb-4 shadow-md"
        onChange={handleSearch}
      />
      <table className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Qty</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.filter(item => item.name.toLowerCase().includes(searchTerm)).map(item => (
            <tr key={item.id} className="border-b hover:bg-gray-100">
              <td className="p-3">
                <img src={item.img} alt={item.name} className="w-10 h-10 rounded" />
              </td>
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.qty}</td>
              <td className="p-3">₹{item.price}</td>
              <td className="p-3">
                <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
