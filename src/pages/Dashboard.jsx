import React, { useState } from "react";

import Sidebar from "../components/Sidebar"
import UserTable from "../components/UserManagement/UserTable";
import RoleTable from "../components/RoleManagement/RoleTable";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="p-0 col-12 col-md-3 col-lg-2">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-10">
          <div className="container py-4">
            {activeTab === "users" ? (
              <div>
                <h2 className="mb-4">User Management</h2>
                <UserTable />
              </div>
            ) : (
              <div>
                <div className="mb-4 d-flex justify-content-between align-items-center">
                  
                  
                </div>
                <RoleTable />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
