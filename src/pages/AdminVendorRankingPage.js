import React from 'react';
import SideNav from "../components/sidenav";
import '../styles/InventoryDashboard.css';

function AdminVendorRankingPage() {
  return (
    <div className="container mt-5 dashboard-page">
      <SideNav />
      <div className="dashboard-header">
        <h1 className="dashboard-title">Vendor Ranking</h1>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
        <iframe
            style={{ background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)' }}
            src="https://charts.mongodb.com/charts-project-0-plpmt/embed/charts?id=1423964e-6809-4b8b-8708-34a484b55a43&maxDataAge=3600&theme=light&autoRefresh=true"
            title="Inventory Chart 1"
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

export default AdminVendorRankingPage;