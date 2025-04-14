import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between py-5 px-6">
      <Link
        to="/admin-users"
        className="flex items-center gap-1 text-xl sm:text-2xl font-semibold text-gray-800"
      >
        pantripick.
        <BsCart3 className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="ml-1"> - Admin</span>
      </Link>

      <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
      <NavLink
          to="/admin-users"
          className={({ isActive }) =>
            `hover:text-black ${
              isActive ? "text-black underline underline-offset-4" : ""
            }`
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/admin-products/"
          className={({ isActive }) =>
            `hover:text-black ${
              isActive ? "text-black underline underline-offset-4" : ""
            }`
          }
        >
          Products
        </NavLink>
      
        <NavLink
          to="/admin-addprod"
          className={({ isActive }) =>
            `hover:text-black ${
              isActive ? "text-black underline underline-offset-4" : ""
            }`
          }
        >
          Add Product
        </NavLink>
        <NavLink
          to="/admin-orders"
          className={({ isActive }) =>
            `hover:text-black ${
              isActive ? "text-black underline underline-offset-4" : ""
            }`
          }
        >
          Orders
        </NavLink>
      </ul>
      <div className="relative group">
        <NavLink to="/admin-login">
          <FiLogOut className="w-6 h-6 text-gray-600 cursor-pointer" />
        </NavLink>
      </div>
    </div>
  );
};

export default AdminNavbar;
