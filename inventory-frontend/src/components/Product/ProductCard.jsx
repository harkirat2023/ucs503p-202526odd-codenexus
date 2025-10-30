import React from "react";
import {FiEdit, FiTrash2, FiPackage} from "react-icons/fi";
import {motion} from "framer-motion";

const ProductCard = ({product, onEdit, onDelete}) => {
  return (
    <motion.div
      className="product-card"
      whileHover={{y: -5}}
      transition={{type: "spring", stiffness: 300}}>
      <div className="product-card-header">
        <div className="product-icon">
          <FiPackage />
        </div>
        <div className="product-actions">
          <button
            className="card-btn edit-btn"
            onClick={() => onEdit(product)}
            title="Edit Product">
            <FiEdit />
          </button>
          <button
            className="card-btn delete-btn"
            onClick={() => onDelete(product._id)}
            title="Delete Product">
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div className="product-card-body">
        <h4 className="product-name">{product.name}</h4>
        <span className="product-category badge badge-info">
          {product.category || "Uncategorized"}
        </span>
        <div className="product-price">${product.unitPrice?.toFixed(2)}</div>
        {product.barcode && (
          <div className="product-barcode">
            <small>Barcode:</small> {product.barcode}
          </div>
        )}
      </div>

      <div className="product-card-footer">
        <small>Added {new Date(product.createdAt).toLocaleDateString()}</small>
      </div>

      <style jsx>{`
        .product-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          transition: all 0.3s;
          cursor: pointer;
        }
        .product-card:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: #667eea;
        }
        .product-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        .product-icon {
          width: 48px;
          height: 48px;
          background: #ede9fe;
          color: #667eea;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }
        .product-actions {
          display: flex;
          gap: 0.5rem;
        }
        .card-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
        }
        .edit-btn {
          background: #dbeafe;
          color: #1e40af;
        }
        .edit-btn:hover {
          background: #3b82f6;
          color: white;
        }
        .delete-btn {
          background: #fee2e2;
          color: #991b1b;
        }
        .delete-btn:hover {
          background: #ef4444;
          color: white;
        }
        .product-card-body {
          margin-bottom: 1rem;
        }
        .product-name {
          font-size: 1.25rem;
          color: #1f2937;
          margin: 0 0 0.5rem 0;
        }
        .product-category {
          margin-bottom: 0.75rem;
          display: inline-block;
        }
        .product-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: #667eea;
          margin: 0.5rem 0;
        }
        .product-barcode {
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 0.5rem;
        }
        .product-barcode small {
          font-weight: 600;
        }
        .product-card-footer {
          border-top: 1px solid #f3f4f6;
          padding-top: 0.75rem;
          color: #9ca3af;
          font-size: 0.875rem;
        }
      `}</style>
    </motion.div>
  );
};

export default ProductCard;
