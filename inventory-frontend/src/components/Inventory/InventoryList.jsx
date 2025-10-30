import React, {useEffect, useState} from "react";
import API from "../../api/axios";
import {toast} from "react-toastify";
import Loader from "../Common/Loader";

const handleThresholdChange = async (productId, value) => {
  try {
    await API.post("/inventory/set-threshold", {
      productId,
      threshold: parseInt(value),
    });
    toast.success("Threshold updated!");
  } catch {
    toast.error("Failed to update threshold");
  }
};


const InventoryList = ({refreshTrigger}) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const {data} = await API.get("/inventory");
        setInventory(data);
      } catch (error) {
        toast.error("Failed to fetch inventory");
      }
      setLoading(false);
    };
    fetchInventory();
  }, [refreshTrigger]);

  if (loading) return <Loader />;

  return (
    <div className="card">
      <div className="card-header">
        <h3>📊 Inventory Status</h3>
      </div>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Threshold</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item._id}>
                <td>{item.productId?.name || "Unknown"}</td>
                <td>
                  <strong>{item.quantity}</strong>
                </td>
                <td>
                  <input
                    type="number"
                    value={item.threshold}
                    min={0}
                    style={{width: "55px"}}
                    onChange={(e) =>
                      handleThresholdChange(item.productId._id, e.target.value)
                    }
                  />
                </td>

                <td>{item.location || "Main Warehouse"}</td>
                <td>
                  <span
                    className={`badge ${
                      item.quantity > 50
                        ? "badge-success"
                        : item.quantity > 10
                        ? "badge-warning"
                        : "badge-danger"
                    }`}>
                    {item.quantity > 50
                      ? "In Stock"
                      : item.quantity > 10
                      ? "Low Stock"
                      : "Critical"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryList;
