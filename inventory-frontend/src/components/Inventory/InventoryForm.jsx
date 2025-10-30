// import React, {useState} from "react";
// import API from "../../api/axios";
// import {toast} from "react-toastify";

// const InventoryForm = ({onSuccess}) => {
//   const [form, setForm] = useState({productId: "", quantity: "", reason: ""});
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setForm({...form, [e.target.name]: e.target.value});

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await API.post("/inventory/update", {
//         ...form,
//         quantity: parseInt(form.quantity),
//       });
//       toast.success("Inventory updated!");
//       setForm({productId: "", quantity: "", reason: ""});
//       onSuccess();
//     } catch (error) {
//       toast.error("Failed to update inventory");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h3>📦 Update Stock</h3>
//       </div>
//       <form onSubmit={handleSubmit} className="form">
//         <div className="form-group">
//           <label>Product ID</label>
//           <input
//             name="productId"
//             value={form.productId}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Quantity (+/-)</label>
//           <input
//             name="quantity"
//             type="number"
//             value={form.quantity}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Reason</label>
//           <input name="reason" value={form.reason} onChange={handleChange} />
//         </div>
//         <button type="submit" className="btn btn-primary" disabled={loading}>
//           {loading ? "Updating..." : "Update Stock"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default InventoryForm;

import React, {useEffect, useState} from "react";
import API from "../../api/axios";
import {toast} from "react-toastify";

const InventoryForm = ({onSuccess}) => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    quantity: "",
    location: "",
    threshold: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await API.get("/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/inventory/update", {
        ...form,
        quantity: parseInt(form.quantity),
        threshold: form.threshold ? parseInt(form.threshold) : undefined,
      });
      toast.success("Inventory updated!");
      setForm({productId: "", quantity: "", location: "", threshold: ""});
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update inventory");
    }
  };

  return (
    <div className="form-card">
      <h3>🛒 Update Stock</h3>
      <form onSubmit={handleSubmit}>
        <label>Product</label>
        <select
          name="productId"
          value={form.productId}
          onChange={handleChange}
          required>
          <option value="">Select product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} (Barcode: {p.barcode})
            </option>
          ))}
        </select>
        <label>Quantity (+ / -)</label>
        <input
          name="quantity"
          value={form.quantity}
          type="number"
          onChange={handleChange}
          required
        />
        <label>Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="(default: Main Warehouse)"
        />
        <label>Low Stock Threshold</label>
        <input
          name="threshold"
          value={form.threshold}
          type="number"
          onChange={handleChange}
          placeholder="e.g. 10 (optional)"
        />
        <button
          type="submit"
          className="btn btn-primary"
          style={{marginTop: "1rem"}}>
          Update Stock
        </button>
      </form>
    </div>
  );
};

export default InventoryForm;
