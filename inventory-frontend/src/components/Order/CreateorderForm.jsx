import React, {useState, useRef} from "react";
import API from "../../api/axios";
import {toast} from "react-toastify";
// Use the camera barcode scanner you already implemented!
import {Html5Qrcode} from "html5-qrcode";

const CreateOrderForm = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [productMap, setProductMap] = useState({});
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);

  // Map scanned barcode to product
  const handleBarcodeScan = async (barcode) => {
    try {
      const {data} = await API.post("/barcode/scan", {code: barcode});
      const product = data.productId;
      if (!product) {
        toast.error("Product not found for barcode");
        return;
      }
      // Check already added
      let found = false;
      setOrderItems((cur) =>
        cur.map((item) => {
          if (item.productId === product._id) {
            found = true;
            return {...item, quantity: item.quantity + 1};
          }
          return item;
        })
      );
      if (!found) {
        setOrderItems((prev) => [
          ...prev,
          {
            productId: product._id,
            name: product.name,
            price: product.unitPrice,
            quantity: 1,
          },
        ]);
      }
      setProductMap((prev) => ({...prev, [product._id]: product}));
      toast.success(`Added: ${product.name}`);
    } catch {
      toast.error("Barcode not registered!");
    }
  };

  // Camera scan logic
  const startCamera = async () => {
    setIsScanning(true);
    scannerRef.current = new Html5Qrcode("order-barcode-scanner");
    try {
      await scannerRef.current.start(
        {facingMode: "environment"},
        {fps: 10, qrbox: {width: 250, height: 150}, aspectRatio: 1.0},
        (barcode) => {
          handleBarcodeScan(barcode);
          stopCamera();
        },
        () => {}
      );
    } catch {
      toast.error("Camera permission denied");
      setIsScanning(false);
    }
  };
  const stopCamera = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch {}
    }
    setIsScanning(false);
  };

  const handleQtyChange = (id, qty) => {
    setOrderItems((items) =>
      items.map((i) => (i.productId === id ? {...i, quantity: qty} : i))
    );
  };

  const handleRemove = (id) => {
    setOrderItems((items) => items.filter((i) => i.productId !== id));
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    if (orderItems.length === 0) return toast.warn("No item to order.");
    const items = orderItems.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
    }));
    try {
      await API.post("/orders", {items});
      toast.success("Order placed! Stock updated.");
      setOrderItems([]);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Order failed");
    }
  };

  return (
    <div className="card" style={{maxWidth: 600, margin: "auto"}}>
      <h2>Create New Order</h2>
      <div
        id="order-barcode-scanner"
        style={{width: "100%", minHeight: 168}}></div>
      <button
        className={`btn btn-primary ${isScanning ? "btn-danger" : ""}`}
        onClick={isScanning ? stopCamera : startCamera}
        style={{margin: "1rem 0"}}>
        {isScanning ? "Stop Camera" : "Start Barcode Scanner"}
      </button>
      <form onSubmit={submitOrder}>
        {orderItems.length > 0 && (
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item.productId}>
                  <td>{item.name}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      style={{width: "50px"}}
                      onChange={(e) =>
                        handleQtyChange(
                          item.productId,
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemove(item.productId)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button
          type="submit"
          className="btn btn-success"
          style={{marginTop: "1rem"}}>
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrderForm;
