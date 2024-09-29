// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children, role, ...rest }) => {
//     const token = localStorage.getItem('token');
//     const userRole = token ? JSON.parse(atob(token.split('.')[1]))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : null;

//     return (
//         <Route
//             {...rest}
//             element={userRole && userRole.includes(role) ? children : <Navigate to="/login" />}
//         />
//     );
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ role }) => {
    const token = localStorage.getItem('token');

    // Extract the role from the token if it exists
    const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

    // Check if the user role matches the required role
    return userRole && userRole.includes(role) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;