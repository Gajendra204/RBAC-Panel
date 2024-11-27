import React, { useState } from "react";
import { FaUsers, FaShieldAlt, FaBars } from "react-icons/fa";

function Sidebar({ activeTab, setActiveTab }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div>
      {/* Hamburger Menu for Small Screens */}
      <button
        className="fixed z-50 p-2 text-white bg-gray-800 rounded-md shadow-md top-5 left-5 md:hidden"
        onClick={toggleSidebar}
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b bg-gray-800 to-gray-500 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 w-64 shadow-lg`}
      >
        {/* Admin Dashboard Heading */}
        <div className="flex items-center justify-center py-6 border-b border-gray-600">
          <h1 className="text-2xl font-bold tracking-wide">Admin Dashboard</h1>
        </div>

        {/* Sidebar Menu */}
        <nav className="px-4 mt-6 space-y-4">
          <button
            className={`flex items-center px-3 py-2 rounded-lg w-full text-base font-medium hover:bg-gray-500 transition ${
              activeTab === "users" ? "bg-gray-600" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            <FaUsers className="mr-3" />
            User
          </button>
          <button
            className={`flex items-center px-3 py-2 rounded-lg w-full text-base font-medium hover:bg-gray-500 transition ${
              activeTab === "roles" ? "bg-gray-600" : ""
            }`}
            onClick={() => setActiveTab("roles")}
          >
            <FaShieldAlt className="mr-3" />
            Role 
          </button>
        </nav>
      </div>

      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-700 bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;
