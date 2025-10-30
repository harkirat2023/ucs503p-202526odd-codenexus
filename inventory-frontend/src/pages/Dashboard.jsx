import React, {useState, useEffect} from "react";
import {FiPackage, FiDatabase, FiAlertTriangle} from "react-icons/fi";
import StatsCard from "../components/Dashboard/StatsCard";
import ProductForm from "../components/Product/ProductForm";
import ProductList from "../components/Product/ProductList";
import API from "../api/axios";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(0);
  const [stats, setStats] = useState({products: 0, inventory: 0, lowStock: 0});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, inventoryRes] = await Promise.all([
          API.get("/products"),
          API.get("/inventory"),
        ]);
        setStats({
          products: productsRes.data.length,
          inventory: inventoryRes.data.reduce((sum, i) => sum + i.quantity, 0),
          lowStock: inventoryRes.data.filter((i) => i.quantity < 10).length,
        });
      } catch (error) {
        console.error("Failed to fetch stats");
      }
    };
    fetchStats();
  }, [refresh]);

  return (
    <div className="page">
      <h1 className="page-title">Dashboard</h1>
      <div className="stats-grid">
        <StatsCard
          title="Total Products"
          value={stats.products}
          icon={<FiPackage />}
          color="#667eea"
        />
        <StatsCard
          title="Total Stock"
          value={stats.inventory}
          icon={<FiDatabase />}
          color="#3b82f6"
        />
        <StatsCard
          title="Low Stock"
          value={stats.lowStock}
          icon={<FiAlertTriangle />}
          color="#f59e0b"
        />
      </div>
      <div className="grid-2">
        <ProductForm onSuccess={() => setRefresh((r) => r + 1)} />
        <ProductList refreshTrigger={refresh} />
      </div>
    </div>
  );
};

export default Dashboard;
