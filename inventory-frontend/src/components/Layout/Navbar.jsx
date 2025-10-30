import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {FiLogOut, FiMenu, FiBell, FiUser} from "react-icons/fi";
import {AuthContext} from "../../context/AuthContext";

const Navbar = ({toggleSidebar}) => {
  const {user, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <h1 className="navbar-title">Inventory Management</h1>
      </div>
      <div className="navbar-right">
        <button className="icon-btn">
          <FiBell />
          <span className="badge">3</span>
        </button>
        <div className="user-menu">
          <FiUser />
          <span>{user?.role || "User"}</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
