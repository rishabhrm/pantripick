import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4567/api/users/fetch-user");
        const fetchedUsers = res.data.users.map(user => ({
          id: user.u_id,
          name: user.u_name,
          email: user.u_email,
          address: user.u_city
        }));
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (key) => {
    let ascending = true;
    if (sortConfig && sortConfig.key === key && sortConfig.ascending) {
      ascending = false;
    }
    setSortConfig({ key, ascending });
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

  const handleRemove = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to remove this user?");
    if (!confirmed) return;

    try {
      await axios.delete("http://localhost:4567/api/users/admin-delete-user", {
        data: { id: userId },
      });
      setUsers(prev => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black p-6">
      <h2 className="text-3xl font-bold mb-4">Users List</h2>
      <input
        type="text"
        placeholder="Search for Users..."
        className="mb-4 p-2 w-full max-w-lg rounded-lg border border-gray-300 bg-white text-black"
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
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">No users found</td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-3 text-center">{user.name}</td>
                  <td className="p-3 text-center">{user.email}</td>
                  <td className="p-3 text-center">{user.address}</td>
                  <td className="p-3 text-center">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                      onClick={() => handleRemove(user.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;