// import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import { verifyUser, verifyAdmin } from '../services/authService';

// const ProtectedRoute = ({ element: Component, requireAdmin = false, ...rest }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const checkAuthenticationStatus = async () => {
//       let result;
//       if (requireAdmin) {
//         result = await verifyAdmin(); // Verify if the user is an admin
//       } else {
//         result = await verifyUser(); // Verify if the user is logged in
//       }
//       setIsAuthenticated(result);
//     };

//     checkAuthenticationStatus();
//   }, [requireAdmin]);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>; // Show a loading state while checking
//   }

//   return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;


import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyAdmin } from '../services/authService';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const result = await verifyAdmin(); // Ensure this uses the token from local storage
        setIsAdmin(result);
      } catch (error) {
        console.error('Error verifying admin status:', error);
        setIsAdmin(false); // Treat errors as unauthorized
      }
    };

    checkAdminStatus();
  }, []);

  if (isAdmin === null) {
    return <div>Loading...</div>; // Show loading state while verifying
  }

  return isAdmin ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
