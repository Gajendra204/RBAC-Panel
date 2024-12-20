import React, { useState, useEffect } from "react";

function UserForm({ onClose, onSave, roles, user }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");
  const [active, setActive] = useState(user?.active || false);

  const handleSubmit = () => {
    if (!name || !email || !role) {
      alert("Please fill in all fields.");
      return;
    }

    // We are validating with the email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    onSave({ name, email, role, active });
    onClose();
  };

  return (
    <div className="top-0 left-0 bg-opacity-50 position-fixed w-100 h-100 bg-dark d-flex justify-content-center align-items-center">
      <div className="max-w-lg p-4 bg-white rounded shadow-lg w-100">
        <h3 className="mb-4 text-xl font-bold">{user ? "Edit User" : "Add User"}</h3>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-select"
          >
            <option value="" disabled>
              Select Role
            </option>
            {roles.map((r) => (
              <option key={r.name} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="gap-2 form-check-label d-flex align-items-center">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="form-check-input"
            />
            Active
          </label>
        </div>
        <div className="gap-2 d-flex justify-content-end">
          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
