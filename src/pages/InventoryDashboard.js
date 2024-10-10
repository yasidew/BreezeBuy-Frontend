/**
 * InventoryDashboard Component
 * This component displays the inventory dashboard with charts.
 * Author: [Yasitha Dewmin | IT21440922]
 */

import React from 'react';
import SideNav from "../components/sidenav";
import '../styles/InventoryDashboard.css';

function InventoryDashboard() {
  return (
    <div className="container mt-5 dashboard-page">
      <SideNav />
      <div className="dashboard-header">
        <h1 className="dashboard-title">Inventory Dashboard</h1>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
        <iframe
            style={{ background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)' }}
            src="https://charts.mongodb.com/charts-project-0-plpmt/embed/charts?id=50a66d9f-a049-49c4-8efe-81cddce8812d&maxDataAge=3600&theme=light&autoRefresh=true"
            title="Inventory Chart 1"
            width="600"
            height="450"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <div className="chart-container">
          <iframe
            style={{ background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)' }}
            src="https://charts.mongodb.com/charts-project-0-plpmt/embed/charts?id=6702a6d8-8afb-4909-8bbf-9cb017bd7337&maxDataAge=3600&theme=light&autoRefresh=true"
            title="Inventory Chart 2"
            width="600"
            height="450"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default InventoryDashboard;