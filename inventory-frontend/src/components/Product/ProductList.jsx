import React, {useEffect, useState} from "react";
import API from "../../api/axios";
import {FiTrash2, FiEdit} from "react-icons/fi";
import {toast} from "react-toastify";
import Loader from "../Common/Loader";

const ProductList = ({refreshTrigger}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const {data} = await API.get("/products");
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await API.delete(`/products/${id}`);
        toast.success("Product deleted");
        fetchProducts();
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="card">
      <div className="card-header">
        <h3>📋 Product List</h3>
      </div>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Barcode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>
                  <span className="badge badge-info">
                    {p.category || "N/A"}
                  </span>
                </td>
                <td>₹{p.unitPrice?.toFixed(2)}</td>
                <td>{p.barcode || "—"}</td>
                <td>
                  <button
                    className="btn-icon btn-danger"
                    onClick={() => handleDelete(p._id)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
