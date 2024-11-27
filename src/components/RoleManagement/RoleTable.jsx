import React, { useState, useEffect } from "react";

function RoleTable() {
  const [roles, setRoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [error, setError] = useState("");

  // Load roles from localStorage
  useEffect(() => {
    const savedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setRoles(savedRoles);
  }, []);

  // Save roles to localStorage
  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  // Handle Add/Edit Role
  const handleSaveRole = (role) => {
    if (!role.name || role.permissions.length === 0) {
      setError("Role name and permissions are required.");
      return;
    }

    if (editingRole) {
      setRoles((prev) =>
        prev.map((r) => (r.id === editingRole.id ? { ...role, id: r.id } : r))
      );
      setEditingRole(null);
    } else {
      setRoles((prev) => [...prev, { ...role, id: Date.now() }]);
    }
    setShowForm(false);
    setError(""); // Clear error on successful save
  };

  // Handle Delete Role
  const handleDelete = (id) => {
    const newRoles = roles.filter((r) => r.id !== id);
    setRoles(newRoles);
  };

  return (
    <div className="container px-4 mx-auto my-6">
      <div className="p-6 ">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Role Management</h2>
          <button
            className="px-5 py-2 text-white rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            onClick={() => setShowForm(true)}
          >
            {editingRole ? "Edit Role" : "Add Role"}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Roles Table */}
        <div className="overflow-hidden rounded-lg shadow-md">
          <table className="w-full border-collapse table-auto">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-left text-white">
                  Role Name
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-left text-white">
                  Permissions
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-left text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles.map((role, idx) => (
                <tr
                  key={role.id}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50" : ""
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {role.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {role.permissions.join(", ")}
                  </td>
                  <td className="flex px-4 py-3 space-x-2">
                    <button
                      className="px-3 py-1 text-sm text-white bg-green-500 rounded shadow-md hover:bg-green-600"
                      onClick={() => {
                        setEditingRole(role);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-sm text-white bg-red-500 rounded shadow-md hover:bg-red-600"
                      onClick={() => handleDelete(role.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Role Form */}
        {showForm && (
          <RoleForm
            onClose={() => {
              setEditingRole(null);
              setShowForm(false);
            }}
            onSave={handleSaveRole}
            role={editingRole}
          />
        )}
      </div>
    </div>
  );
}

function RoleForm({ onClose, onSave, role }) {
  const predefinedPermissions = ["Read", "Write", "Delete"];
  const [name, setName] = useState(role?.name || "");
  const [permissions, setPermissions] = useState(role?.permissions || []);
  const [formError, setFormError] = useState("");

  const handleTogglePermission = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = () => {
    if (!name || permissions.length === 0) {
      setFormError("Role name and at least one permission are required.");
      return;
    }

    onSave({ name, permissions });
    setFormError(""); // Clear form-specific error on successful submit
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-xl w-96">
        <h3 className="mb-4 text-xl font-semibold text-center text-gray-800">
          {role ? "Edit Role" : "Add Role"}
        </h3>
        <input
          type="text"
          placeholder="Role Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md"
        />
        <div className="mb-4">
          <p className="mb-2 text-sm font-semibold text-gray-700">Permissions</p>
          <div className="grid grid-cols-3 gap-2">
            {predefinedPermissions.map((permission) => (
              <label
                key={permission}
                className="flex items-center space-x-2 text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={permissions.includes(permission)}
                  onChange={() => handleTogglePermission(permission)}
                  className="text-blue-600 form-checkbox"
                />
                <span>{permission}</span>
              </label>
            ))}
          </div>
        </div>
        {formError && (
          <div className="p-2 mb-4 text-red-700 bg-red-100 rounded-md">
            <strong>Error:</strong> {formError}
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-white bg-gray-500 rounded shadow hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded shadow hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleTable;
