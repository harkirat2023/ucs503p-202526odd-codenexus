// import React, { useState, useRef, useEffect } from 'react'
// import { BrowserMultiFormatReader } from '@zxing/library'
// import { productsAPI, transactionsAPI } from '../services/api'

// export default function Scanner() {
//   const [isScanning, setIsScanning] = useState(false)
//   const [scannedCode, setScannedCode] = useState('')
//   const [product, setProduct] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [transactionType, setTransactionType] = useState('IN')
//   const [quantity, setQuantity] = useState(1)
//   const videoRef = useRef(null)
//   const codeReader = useRef(null)

//   useEffect(() => {
//     codeReader.current = new BrowserMultiFormatReader()
//     return () => {
//       stopScanning()
//     }
//   }, [])

//   const startScanning = async () => {
//     try {
//       setError('')
//       setIsScanning(true)
      
//       const videoInputDevices = await codeReader.current.listVideoInputDevices()
//       if (videoInputDevices.length === 0) {
//         throw new Error('No camera found')
//       }

//       await codeReader.current.decodeFromVideoDevice(
//         videoInputDevices[0].deviceId,
//         videoRef.current,
//         (result, error) => {
//           if (result) {
//             setScannedCode(result.getText())
//             lookupProduct(result.getText())
//             stopScanning()
//           }
//         }
//       )
//     } catch (err) {
//       setError('Camera access denied or not available')
//       setIsScanning(false)
//     }
//   }

//   const stopScanning = () => {
//     if (codeReader.current) {
//       codeReader.current.reset()
//     }
//     setIsScanning(false)
//   }

//   const lookupProduct = async (barcode) => {
//     setLoading(true)
//     try {
//       // First try to find in our database
//       const response = await productsAPI.getAll({ barcode })
//       if (response.data.length > 0) {
//         setProduct(response.data[0])
//       } else {
//         // Try external lookup
//         try {
//           const lookupResponse = await productsAPI.lookupBarcode(barcode)
//           if (lookupResponse.data.found) {
//             const productData = lookupResponse.data.data
//             setProduct({
//               name: productData.product_name || productData.product_name_en,
//               category: productData.categories_tags?.[0] || 'General',
//               barcode: barcode,
//               description: productData.ingredients_text || '',
//               imageURL: productData.image_url,
//               quantity: 0,
//               price: 0
//             })
//           } else {
//             setError('Product not found in database or external sources')
//           }
//         } catch (lookupError) {
//           setError('Product not found in database')
//         }
//       }
//     } catch (error) {
//       console.error('Error looking up product:', error)
//       setError('Error looking up product')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleTransaction = async () => {
//     if (!product) return

//     try {
//       setLoading(true)
      
//       // If product doesn't exist in our database, create it first
//       let productId = product._id
//       if (!productId) {
//         const createResponse = await productsAPI.create(product)
//         productId = createResponse.data._id
//       }

//       // Create transaction
//       await transactionsAPI.create({
//         product: productId,
//         type: transactionType,
//         quantity: parseInt(quantity)
//       })

//       // Reset form
//       setProduct(null)
//       setScannedCode('')
//       setQuantity(1)
//       alert('Transaction recorded successfully!')
//     } catch (error) {
//       console.error('Error recording transaction:', error)
//       setError('Error recording transaction')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleManualLookup = () => {
//     if (scannedCode.trim()) {
//       lookupProduct(scannedCode.trim())
//     }
//   }

//   return (
//     <div className="px-4 py-6 sm:px-0">
//       <h1 className="text-2xl font-bold text-gray-900 mb-8">Barcode Scanner</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Scanner Section */}
//         <div className="bg-white shadow rounded-lg p-6">
//           <h2 className="text-lg font-medium text-gray-900 mb-4">Scanner</h2>
          
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//               {error}
//             </div>
//           )}

//           <div className="space-y-4">
//             <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
//               <video
//                 ref={videoRef}
//                 className="w-full h-full object-cover"
//                 style={{ display: isScanning ? 'block' : 'none' }}
//               />
//               {!isScanning && (
//                 <div className="flex items-center justify-center h-full">
//                   <div className="text-center">
//                     <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <p className="mt-2 text-sm text-gray-500">Camera preview will appear here</p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="flex space-x-3">
//               {!isScanning ? (
//                 <button
//                   onClick={startScanning}
//                   className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
//                 >
//                   Start Scanning
//                 </button>
//               ) : (
//                 <button
//                   onClick={stopScanning}
//                   className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
//                 >
//                   Stop Scanning
//                 </button>
//               )}
//             </div>

//             <div className="border-t pt-4">
//               <label htmlFor="manual-code" className="block text-sm font-medium text-gray-700 mb-2">
//                 Or enter barcode manually:
//               </label>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   id="manual-code"
//                   value={scannedCode}
//                   onChange={(e) => setScannedCode(e.target.value)}
//                   placeholder="Enter barcode..."
//                   className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
//                 />
//                 <button
//                   onClick={handleManualLookup}
//                   disabled={loading}
//                   className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
//                 >
//                   Lookup
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Info Section */}
//         <div className="bg-white shadow rounded-lg p-6">
//           <h2 className="text-lg font-medium text-gray-900 mb-4">Product Information</h2>
          
//           {loading ? (
//             <div className="flex justify-center items-center h-48">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//             </div>
//           ) : product ? (
//             <div className="space-y-4">
//               <div className="flex items-center space-x-4">
//                 {product.imageURL && (
//                   <img
//                     src={product.imageURL}
//                     alt={product.name}
//                     className="h-16 w-16 object-cover rounded-lg"
//                   />
//                 )}
//                 <div className="flex-1">
//                   <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
//                   <p className="text-sm text-gray-500">{product.category}</p>
//                   {product.quantity !== undefined && (
//                     <p className="text-sm text-gray-500">Current stock: {product.quantity}</p>
//                   )}
//                 </div>
//               </div>

//               {product.description && (
//                 <p className="text-sm text-gray-600">{product.description}</p>
//               )}

//               <div className="border-t pt-4">
//                 <h4 className="text-md font-medium text-gray-900 mb-3">Record Transaction</h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Type
//                     </label>
//                     <select
//                       value={transactionType}
//                       onChange={(e) => setTransactionType(e.target.value)}
//                       className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
//                     >
//                       <option value="IN">Stock In</option>
//                       <option value="OUT">Stock Out</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Quantity
//                     </label>
//                     <input
//                       type="number"
//                       min="1"
//                       value={quantity}
//                       onChange={(e) => setQuantity(e.target.value)}
//                       className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
//                     />
//                   </div>
//                 </div>
//                 <button
//                   onClick={handleTransaction}
//                   disabled={loading}
//                   className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
//                 >
//                   Record Transaction
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center text-gray-500 py-12">
//               <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//               </svg>
//               <p className="mt-2">Scan or enter a barcode to view product information</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
import React, {useState, useRef, useEffect} from "react";
import {BrowserMultiFormatReader} from "@zxing/library";
import {productsAPI, transactionsAPI} from "../services/api";

export default function Scanner() {
  const reader = useRef(null);
  const video = useRef(null);
  const [code, setCode] = useState("");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    reader.current = new BrowserMultiFormatReader();
  }, []);

  const start = async () => {
    const cams = await reader.current.listVideoInputDevices();
    reader.current.decodeFromVideoDevice(
      cams[0].deviceId,
      video.current,
      (r) => {
        if (r) {
          reader.current.reset();
          setCode(r.getText());
          lookup(r.getText());
        }
      }
    );
  };

  const lookup = async (b) => {
    const res = await productsAPI.getAll({barcode: b});
    if (res.data.length) setProduct(res.data[0]);
  };

  return (
    <div>
      <video ref={video} className="w-full h-64 bg-gray-200" />
      <button onClick={start} className="bg-blue-600 text-white px-4 py-2 mt-2">
        Scan
      </button>
      {product && (
        <div>
          {product.name} – {product.quantity}
        </div>
      )}
    </div>
  );
}
