import React, { useState } from "react";

const UsersList = () => {
  const [users, setUsers] = useState([
    { name: "Rishabh", email: "rishabh@mail.com", address: "Yagnik Road", orders: 4 },
    { name: "Raj", email: "raj@mail.com", address: "Trikonbaug", orders: 12 },
    { name: "Shailendra", email: "shailendra@mail.com", address: "Indira Circle", orders: 20 },
    { name: "Lakshya", email: "lkumar@mail.com", address: "Delhi", orders: 12 },
    { name: "Raghu", email: "ryadav@mail.com", address: "Pune", orders: 22 },
    { name: "Sunil", email: "skumar@mail.com", address: "Ahmedabad", orders: 30 },
    { name: "Anu", email: "anu@mail.com", address: "Patna", orders: 22 },
  ]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, ascending } = sortConfig;
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSort = (key) => {
    let ascending = true;
    if (sortConfig && sortConfig.key === key && sortConfig.ascending) {
      ascending = false;
    }
    setSortConfig({ key, ascending });
  };

  const handleRemove = (email) => {
    setUsers(users.filter((user) => user.email !== email));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black p-6">
      <h2 className="text-3xl font-bold mb-4">Users List</h2>
      <input
        type="text"
        placeholder="Search for Users..."
        className="mb-4 p-2 w-full max-w-lg rounded-lg border border--300 bg-white text-black"
        value={search}
        onChange={handleSearch}
      />
      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="w-full bg-white text-black shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 cursor-pointer" onClick={() => handleSort("name")}>Name</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort("email")}>Email</th>
              <th className="p-3">Address</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort("orders")}>Total Orders</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-3 text-center">{user.name}</td>
                <td className="p-3 text-center">{user.email}</td>
                <td className="p-3 text-center">{user.address}</td>
                <td className="p-3 text-center">{user.orders}</td>
                <td className="p-3 text-center">
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => handleRemove(user.email)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
