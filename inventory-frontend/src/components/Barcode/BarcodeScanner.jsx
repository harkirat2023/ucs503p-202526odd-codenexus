// import React, {useState} from "react";
// import API from "../../api/axios";
// import {toast} from "react-toastify";
// import {FiCamera, FiSearch} from "react-icons/fi";
// import {motion} from "framer-motion";

// const BarcodeScanner = ({onScanSuccess}) => {
//   const [barcode, setBarcode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [scannedProduct, setScannedProduct] = useState(null);

//   const handleScan = async (e) => {
//     e.preventDefault();
//     if (!barcode.trim()) {
//       toast.error("Please enter a barcode");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Scan barcode endpoint
//       const {data} = await API.post("/barcode/scan", {code: barcode});
//       setScannedProduct(data);
//       toast.success("Barcode scanned successfully!");
//       if (onScanSuccess) onScanSuccess(data);
//     } catch (error) {
//       toast.error(error.response?.data?.msg || "Barcode not found");
//       setScannedProduct(null);
//     }
//     setLoading(false);
//   };

//   const handleClearScan = () => {
//     setBarcode("");
//     setScannedProduct(null);
//   };

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h3>
//           <FiCamera /> Barcode Scanner
//         </h3>
//       </div>

//       <form onSubmit={handleScan} className="form">
//         <div className="form-group">
//           <label>Enter or Scan Barcode</label>
//           <div style={{display: "flex", gap: "0.5rem"}}>
//             <input
//               type="text"
//               placeholder="e.g., 123456789012"
//               value={barcode}
//               onChange={(e) => setBarcode(e.target.value)}
//               autoFocus
//               style={{flex: 1}}
//             />
//             <button
//               type="submit"
//               className="btn btn-primary"
//               disabled={loading}
//               style={{minWidth: "100px"}}>
//               {loading ? (
//                 "Scanning..."
//               ) : (
//                 <>
//                   <FiSearch /> Scan
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </form>

//       {scannedProduct && (
//         <motion.div
//           className="scan-result"
//           initial={{opacity: 0, y: 20}}
//           animate={{opacity: 1, y: 0}}
//           transition={{duration: 0.3}}>
//           <h4>✅ Scanned Product</h4>
//           <div className="product-details">
//             <div className="detail-row">
//               <span className="label">Product Name:</span>
//               <span className="value">
//                 {scannedProduct.productId?.name || "N/A"}
//               </span>
//             </div>
//             <div className="detail-row">
//               <span className="label">Category:</span>
//               <span className="value">
//                 {scannedProduct.productId?.category || "N/A"}
//               </span>
//             </div>
//             <div className="detail-row">
//               <span className="label">Unit Price:</span>
//               <span className="value">
//                 ${scannedProduct.productId?.unitPrice?.toFixed(2) || "0.00"}
//               </span>
//             </div>
//             <div className="detail-row">
//               <span className="label">Barcode:</span>
//               <span className="value badge badge-info">
//                 {scannedProduct.code}
//               </span>
//             </div>
//             <div className="detail-row">
//               <span className="label">Type:</span>
//               <span className="value badge badge-success">
//                 {scannedProduct.type}
//               </span>
//             </div>
//           </div>
//           <button
//             className="btn btn-secondary"
//             onClick={handleClearScan}
//             style={{marginTop: "1rem", width: "100%"}}>
//             Scan Another
//           </button>
//         </motion.div>
//       )}

//       <style jsx>{`
//         .scan-result {
//           margin-top: 1.5rem;
//           padding: 1.5rem;
//           background: #f0fdf4;
//           border: 2px solid #10b981;
//           border-radius: 8px;
//         }
//         .scan-result h4 {
//           color: #065f46;
//           margin-bottom: 1rem;
//           font-size: 1.1rem;
//         }
//         .product-details {
//           display: flex;
//           flex-direction: column;
//           gap: 0.75rem;
//         }
//         .detail-row {
//           display: flex;
//           justify-content: space-between;
//           padding: 0.5rem 0;
//           border-bottom: 1px solid #d1fae5;
//         }
//         .detail-row:last-child {
//           border-bottom: none;
//         }
//         .label {
//           font-weight: 600;
//           color: #374151;
//         }
//         .value {
//           color: #1f2937;
//         }
//         .btn-secondary {
//           background: #6b7280;
//           color: white;
//         }
//         .btn-secondary:hover {
//           background: #4b5563;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BarcodeScanner;

import React, {useState, useEffect} from "react";
import {Html5Qrcode} from "html5-qrcode";
import API from "../../api/axios";
import {toast} from "react-toastify";
import {FiCamera, FiX} from "react-icons/fi";
import {motion} from "framer-motion";

const BarcodeScanner = ({nScanSuccess}) => {
  const [scanning, setScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState(null);
  const [html5QrCode, setHtml5QrCode] = useState(null);

  useEffect(() => {
    return () => {
      if (html5QrCode) {
        html5QrCode.stop().catch(() => {});
      }
    };
  }, [html5QrCode]);

  const startScanning = async () => {
    try {
      const scanner = new Html5Qrcode("barcode-reader");
      setHtml5QrCode(scanner);

      const config = {
        fps: 10,
        qrbox: {width: 250, height: 150},
        aspectRatio: 1.0,
      };

      await scanner.start(
        {facingMode: "environment"}, // Use back camera
        config,
        onScanSuccess,
        onScanError
      );

      setScanning(true);
      toast.info("Camera started. Point at barcode...");
    } catch (error) {
      toast.error("Failed to start camera. Please allow camera access.");
      console.error(error);
    }
  };

  const stopScanning = async () => {
    if (html5QrCode) {
      try {
        await html5QrCode.stop();
        setScanning(false);
        toast.success("Camera stopped");
      } catch (error) {
        console.error("Failed to stop scanner:", error);
      }
    }
  };

  const onScanSuccess = async (decodedText, decodedResult) => {
    console.log(`Barcode detected: ${decodedText}`);

    // Stop camera immediately after successful scan
    await stopScanning();

    // Send barcode to backend
    try {
      const {data} = await API.post("/barcode/scan", {code: decodedText});
      setScannedProduct(data);
      toast.success(`Product found: ${data.productId?.name}`);
      if (onScanSuccess) onScanSuccess(data);
    } catch (error) {
      toast.error("Barcode not found in database");
      setScannedProduct(null);
    }
  };

  const onScanError = (errorMessage) => {
    // Ignore routine scanning errors
    // console.warn(errorMessage);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>
          <FiCamera /> Live Barcode Scanner
        </h3>
      </div>

      <div className="scanner-container">
        {/* Camera View */}
        <div id="barcode-reader" style={{width: "100%"}}></div>

        {/* Control Buttons */}
        <div style={{marginTop: "1rem", textAlign: "center"}}>
          {!scanning ? (
            <button className="btn btn-primary" onClick={startScanning}>
              <FiCamera /> Start Camera Scan
            </button>
          ) : (
            <button className="btn btn-danger" onClick={stopScanning}>
              <FiX /> Stop Camera
            </button>
          )}
        </div>

        {/* Scanned Product Display */}
        {scannedProduct && (
          <motion.div
            className="scan-result"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}>
            <h4>✅ Scanned Product</h4>
            <div className="product-details">
              <div className="detail-row">
                <span className="label">Product:</span>
                <span className="value">{scannedProduct.productId?.name}</span>
              </div>
              <div className="detail-row">
                <span className="label">Category:</span>
                <span className="value">
                  {scannedProduct.productId?.category}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Price:</span>
                <span className="value">
                  ₹{scannedProduct.productId?.unitPrice}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Barcode:</span>
                <span className="value badge badge-info">
                  {scannedProduct.code}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .scanner-container {
          padding: 1rem;
        }
        .scan-result {
          margin-top: 1.5rem;
          padding: 1.5rem;
          background: #f0fdf4;
          border: 2px solid #10b981;
          border-radius: 8px;
        }
        .btn-danger {
          background: #ef4444;
        }
        .btn-danger:hover {
          background: #dc2626;
        }
      `}</style>
    </div>
  );
};

export default BarcodeScanner;
