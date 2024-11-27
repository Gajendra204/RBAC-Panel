import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai"; // Import search icon
import UserForm from "./UserForm";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [statusFilter, setStatusFilter] = useState("all"); // State for status filter
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Load users and roles from localStorage
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const savedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setUsers(savedUsers);
    setRoles(savedRoles);
  }, []);

  // Save users to localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Handle Add/Edit User
  const handleSaveUser = (user) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...user, id: u.id } : u))
      );
      setEditingUser(null);
    } else {
      setUsers((prev) => [...prev, { ...user, id: Date.now() }]);
    }
    setShowForm(false);
  };

  // Handle Delete User
  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Filter users based on search query and status filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.active) ||
      (statusFilter === "inactive" && !user.active);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container p-6 mx-auto my-8 rounded-lg shadow-lg bg-gray-50">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">User Management</h2>
        <button
          className="px-4 py-2 font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:ring focus:ring-blue-300"
          onClick={() => setShowForm(true)}
        >
          {editingUser ? "Edit User" : "Add User"}
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col mb-6 sm:flex-row sm:space-x-4">
        {/* Search Bar with Icon */}
        <div className="relative w-full sm:w-1/3">
          <AiOutlineSearch className="absolute text-gray-400 left-3 top-3" size={20} />
          <input
            type="text"
            className="w-full px-10 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
            placeholder="Search users by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <select
          className="w-full px-4 py-2 border rounded-lg shadow-sm sm:w-1/4 focus:ring focus:ring-blue-200 sm:mt-0"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full overflow-hidden bg-white border-collapse rounded-lg table-auto">
          <thead className="text-white bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-left uppercase">Name</th>
              <th className="px-4 py-3 text-sm font-medium text-left uppercase">Email</th>
              <th className="px-4 py-3 text-sm font-medium text-left uppercase">Role</th>
              <th className="px-4 py-3 text-sm font-medium text-left uppercase">Status</th>
              <th className="px-4 py-3 text-sm font-medium text-center uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm text-gray-700">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{user.role}</td>
                  <td
                    className={`px-4 py-3 text-sm font-medium ${
                      user.active ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </td>
                  <td className="flex justify-center px-4 py-3 space-x-2">
                    <button
                      className="px-3 py-1 text-sm text-white bg-green-600 rounded shadow hover:bg-green-700"
                      onClick={() => {
                        setEditingUser(user);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-sm text-white bg-red-600 rounded shadow hover:bg-red-700"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Form */}
      {showForm && (
        <UserForm
          onClose={() => {
            setEditingUser(null);
            setShowForm(false);
          }}
          onSave={handleSaveUser}
          roles={roles}
          user={editingUser}
        />
      )}
    </div>
  );
}

export default UserTable;
