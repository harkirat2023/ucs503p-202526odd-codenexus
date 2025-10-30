import React, {useState} from "react";
import InventoryForm from "../components/Inventory/InventoryForm";
import InventoryList from "../components/Inventory/InventoryList";

const Inventory = () => {
  const [refresh, setRefresh] = useState(0);
  return (
    <div className="page">
      <h1 className="page-title">Inventory Management</h1>
      <div className="grid-2">
        <InventoryForm onSuccess={() => setRefresh((r) => r + 1)} />
        <InventoryList refreshTrigger={refresh} />
      </div>
    </div>
  );
};

export default Inventory;
