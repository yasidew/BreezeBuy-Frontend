import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidenav.css';

function SideNav() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="floating-btn" onClick={toggleSidebar}>
        {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
      </button>
      <div className={`sidenav ${isOpen ? 'open' : 'closed'}`}>
      <br></br><br></br>
        <Link to="/inventory">
          <i className="fas fa-box-open"></i> {isOpen && <span>Inventory</span>}
        </Link>
        <Link to="/service2">
          <i className="fas fa-truck"></i> {isOpen && <span>Service 2</span>}
        </Link>
        <Link to="/service3">
          <i className="fas fa-tags"></i> {isOpen && <span>Service 3</span>}
        </Link>
      </div>
    </div>
  );
}

export default SideNav;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/sidenav.css';

// function SideNav() {
//   return (
//     <div className="sidenav open">
//       <Link to="/service1">
//         <i className="fas fa-box-open"></i> <span>Service 1</span>
//       </Link>
//       <Link to="/service2">
//         <i className="fas fa-truck"></i> <span>Service 2</span>
//       </Link>
//       <Link to="/service3">
//         <i className="fas fa-tags"></i> <span>Service 3</span>
//       </Link>
//     </div>
//   );
// }

// export default SideNav;