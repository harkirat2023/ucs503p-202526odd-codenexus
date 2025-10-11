// import React from "react";
// import {Routes, Route, Navigate} from "react-router-dom";
// import {AuthProvider, useAuth} from "./context/AuthContext";
// import Layout from "./components/Layout";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Inventory from "./pages/Inventory";
// import AddEditProduct from "./pages/AddEditProduct";
// import Scanner from "./pages/Scanner";
// import Transactions from "./pages/Transactions";

// function PrivateRoute({children}) {
//   const {user, loading} = useAuth();
//   if (loading) return <div>Loading…</div>;
//   return user ? <Layout>{children}</Layout> : <Navigate to="/login" replace />;
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/inventory"
//           element={
//             <PrivateRoute>
//               <Inventory />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/product/new"
//           element={
//             <PrivateRoute>
//               <AddEditProduct />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/product/:id"
//           element={
//             <PrivateRoute>
//               <AddEditProduct />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/scanner"
//           element={
//             <PrivateRoute>
//               <Scanner />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/transactions"
//           element={
//             <PrivateRoute>
//               <Transactions />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </AuthProvider>
//   );
// }

import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {AuthProvider, useAuth} from "./context/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import AddEditProduct from "./pages/AddEditProduct";
import Scanner from "./pages/Scanner";
import Transactions from "./pages/Transactions";

function PrivateRoute({children}) {
  const {user, loading} = useAuth();
  if (loading) return <div>Loading…</div>;
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/new"
          element={
            <PrivateRoute>
              <AddEditProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <AddEditProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/scanner"
          element={
            <PrivateRoute>
              <Scanner />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
