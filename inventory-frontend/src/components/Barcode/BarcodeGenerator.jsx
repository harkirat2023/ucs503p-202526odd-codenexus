import React, {useState} from "react";
import API from "../../api/axios";
import {toast} from "react-toastify";
import {FiPackage} from "react-icons/fi";

const BarcodeGenerator = ({onGenerateSuccess}) => {
  const [form, setForm] = useState({
    code: "",
    type: "Code128",
    productId: "",
  });
  const [loading, setLoading] = useState(false);

  const barcodeTypes = ["Code128", "QR", "EAN", "UPC", "Code39"];

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleGenerateRandom = () => {
    const randomCode = Math.random().toString().slice(2, 15);
    setForm({...form, code: randomCode});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await API.post("/barcode/generate", form);
      toast.success("Barcode generated successfully!");
      setForm({code: "", type: "Code128", productId: ""});
      if (onGenerateSuccess) onGenerateSuccess(data);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to generate barcode");
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>
          <FiPackage /> Barcode Generator
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Product ID</label>
          <input
            name="productId"
            placeholder="Enter Product ID (MongoDB ObjectId)"
            value={form.productId}
            onChange={handleChange}
            required
          />
          <small style={{color: "#6b7280", fontSize: "0.875rem"}}>
            Get the Product ID from the Products list
          </small>
        </div>

        <div className="form-group">
          <label>Barcode Code</label>
          <div style={{display: "flex", gap: "0.5rem"}}>
            <input
              name="code"
              placeholder="Enter or generate code"
              value={form.code}
              onChange={handleChange}
              required
              style={{flex: 1}}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleGenerateRandom}
              style={{minWidth: "120px"}}>
              Generate
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Barcode Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            {barcodeTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Generating..." : "Generate Barcode"}
        </button>
      </form>

      <div className="info-box" style={{marginTop: "1.5rem"}}>
        <h4>ℹ️ Information</h4>
        <ul style={{paddingLeft: "1.5rem", color: "#6b7280"}}>
          <li>Code128: General purpose alphanumeric barcode</li>
          <li>QR: 2D barcode for mobile scanning</li>
          <li>EAN: European Article Number (retail)</li>
          <li>UPC: Universal Product Code (retail)</li>
          <li>Code39: Alphanumeric barcode (logistics)</li>
        </ul>
      </div>

      <style jsx>{`
        .btn-secondary {
          background: #6b7280;
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }
        .btn-secondary:hover {
          background: #4b5563;
        }
        .info-box {
          padding: 1rem;
          background: #f3f4f6;
          border-radius: 8px;
          border-left: 4px solid #3b82f6;
        }
        .info-box h4 {
          margin-bottom: 0.5rem;
          color: #1f2937;
        }
        .info-box ul {
          margin: 0;
        }
        .info-box li {
          margin-bottom: 0.25rem;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default BarcodeGenerator;
