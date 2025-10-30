import React from "react";
import {NavLink} from "react-router-dom";
import {FiHome, FiPackage, FiDatabase, FiBarChart2, FiShoppingCart} from "react-icons/fi";
import {motion} from "framer-motion";

const Sidebar = ({isOpen}) => {
  const menuItems = [
    {path: "/dashboard", icon: <FiHome />, label: "Dashboard"},
    {path: "/products", icon: <FiPackage />, label: "Products"},
    {path: "/inventory", icon: <FiDatabase />, label: "Inventory"},
    {path: "/barcode", icon: <FiBarChart2 />, label: "Barcode"},
    {path: "/create-order", icon: <FiShoppingCart />, label: "Create Order"},
  ];

  return (
    <motion.aside
      className={`sidebar ${isOpen ? "open" : ""}`}
      initial={{x: -250}}
      animate={{x: 0}}
      transition={{duration: 0.3}}>
      <div className="sidebar-header">
        <h2>📦 Inventory</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({isActive}) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }>
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
