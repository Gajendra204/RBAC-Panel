import React, { useState } from "react";

function RoleForm({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Role name is required!");
      return;
    }
    onAdd({ id: Date.now(), name, permissions });
    onClose();
  };

  const handlePermissionChange = (e) => {
    const value = e.target.value;
    setPermissions((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-4 bg-white rounded-lg shadow-lg w-100 w-md-75 w-lg-50">
        <h3 className="mb-4 text-xl font-bold">Add Role</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 font-semibold form-label">Role Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter role name"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 font-semibold form-label">Permissions</label>
            <div className="flex-wrap gap-3 d-flex">
              {["Read", "Write", "Delete"].map((perm) => (
                <label key={perm} className="cursor-pointer d-flex align-items-center">
                  <input
                    type="checkbox"
                    value={perm}
                    onChange={handlePermissionChange}
                    className="form-check-input me-2"
                  />
                  <span>{perm}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="gap-3 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success"
            >
              Save Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoleForm;
