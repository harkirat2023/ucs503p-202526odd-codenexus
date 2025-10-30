import React, {useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import Toast from "./components/Common/Toast";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Barcode from "./pages/Barcode";
import NotFound from "./pages/NotFound";
import CreateOrder from "./pages/Createorder";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Toast />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <div className="app-layout">
                  <Sidebar isOpen={sidebarOpen} />
                  <div className="main-content">
                    <Navbar
                      toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    />
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/inventory" element={<Inventory />} />
                      <Route path="/barcode" element={<Barcode />} />
                      <Route path="/create-order" element={<PrivateRoute><CreateOrder /></PrivateRoute>} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
