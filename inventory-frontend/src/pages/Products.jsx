import React, {useState} from "react";
import ProductForm from "../components/Product/ProductForm";
import ProductList from "../components/Product/ProductList";

const Products = () => {
  const [refresh, setRefresh] = useState(0);
  return (
    <div className="page">
      <h1 className="page-title">Products Management</h1>
      <div className="grid-2">
        <ProductForm onSuccess={() => setRefresh((r) => r + 1)} />
        <ProductList refreshTrigger={refresh} />
      </div>
    </div>
  );
};

export default Products;
