// import React from "react";

// const Barcode = () => (
//   <div className="page">
//     <h1 className="page-title">Barcode Management</h1>
//     <div className="card">
//       <p>Barcode scanning and generation feature coming soon...</p>
//     </div>
//   </div>
// );

// export default Barcode;
import React, {useState} from "react";
import BarcodeScanner from "../components/Barcode/BarcodeScanner";
import BarcodeGenerator from "../components/Barcode/BarcodeGenerator";

const Barcode = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="page">
      <h1 className="page-title">Barcode Management</h1>
      <div className="grid-2">
        <BarcodeScanner onScanSuccess={() => setRefreshKey((k) => k + 1)} />
        <BarcodeGenerator
          onGenerateSuccess={() => setRefreshKey((k) => k + 1)}
        />
      </div>
    </div>
  );
};

export default Barcode;
