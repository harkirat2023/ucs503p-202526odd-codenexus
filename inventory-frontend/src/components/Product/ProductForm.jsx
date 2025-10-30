import React, {useState} from "react";
import API from "../../api/axios";
import {toast} from "react-toastify";

const ProductForm = ({onSuccess}) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    unitPrice: "",
    barcode: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/products", form);
      toast.success("Product added successfully!");
      setForm({name: "", category: "", unitPrice: "", barcode: ""});
      onSuccess();
    } catch (error) {
      toast.error("Failed to add product");
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>➕ Add Product</h3>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Product Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Unit Price</label>
          <input
            name="unitPrice"
            type="number"
            step="0.01"
            value={form.unitPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Barcode</label>
          <input name="barcode" value={form.barcode} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
