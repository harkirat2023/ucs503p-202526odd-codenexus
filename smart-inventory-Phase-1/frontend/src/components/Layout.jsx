import React from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export default function Layout({children}) {
  const {user, logout} = useAuth();
  const nav = useNavigate();
  const loc = useLocation().pathname;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white p-4 flex justify-between">
        <div className="space-x-4">
          {["/dashboard", "/inventory", "/scanner", "/transactions"].map(
            (p) => (
              <Link
                key={p}
                to={p}
                className={loc === p ? "font-bold" : "text-gray-600"}>
                {p.replace("/", "").toUpperCase() || "HOME"}
              </Link>
            )
          )}
        </div>
        <div>
          <span className="mr-4">{user?.email}</span>
          <button
            onClick={() => {
              logout();
              nav("/login");
            }}
            className="text-red-600">
            Logout
          </button>
        </div>
      </nav>
      <main className="p-4">{children}</main>
    </div>
  );
}
