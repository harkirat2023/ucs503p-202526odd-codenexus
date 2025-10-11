// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { productsAPI } from '../services/api'

// export default function Inventory() {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filteredProducts, setFilteredProducts] = useState([])

//   useEffect(() => {
//     loadProducts()
//   }, [])

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = products.filter(product =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (product.barcode && product.barcode.includes(searchTerm))
//       )
//       setFilteredProducts(filtered)
//     } else {
//       setFilteredProducts(products)
//     }
//   }, [searchTerm, products])

//   const loadProducts = async () => {
//     try {
//       const response = await productsAPI.getAll({ limit: 1000 })
//       setProducts(response.data)
//     } catch (error) {
//       console.error('Error loading products:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDelete = async (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await productsAPI.delete(productId)
//         setProducts(products.filter(p => p._id !== productId))
//       } catch (error) {
//         console.error('Error deleting product:', error)
//         alert('Error deleting product')
//       }
//     }
//   }

//   if (loading) {
//     return <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//     </div>
//   }

//   return (
//     <div className="px-4 py-6 sm:px-0">
//       <div className="sm:flex sm:items-center">
//         <div className="sm:flex-auto">
//           <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
//           <p className="mt-2 text-sm text-gray-700">
//             Manage your product inventory
//           </p>
//         </div>
//         <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
//           <Link
//             to="/product/new"
//             className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
//           >
//             Add Product
//           </Link>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="mt-6 max-w-md">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
//         />
//       </div>

//       {/* Products Table */}
//       <div className="mt-8 flex flex-col">
//         <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
//             <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
//               <table className="min-w-full divide-y divide-gray-300">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Product
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Category
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Quantity
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Price
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Barcode
//                     </th>
//                     <th className="relative px-6 py-3">
//                       <span className="sr-only">Actions</span>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredProducts.map((product) => (
//                     <tr key={product._id}>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10">
//                             {product.imageURL ? (
//                               <img className="h-10 w-10 rounded-full object-cover" src={product.imageURL} alt="" />
//                             ) : (
//                               <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
//                                 <span className="text-gray-500 text-xs">📦</span>
//                               </div>
//                             )}
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">
//                               {product.name}
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               {product.description}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {product.category}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                           product.quantity < 10 
//                             ? 'bg-red-100 text-red-800' 
//                             : product.quantity < 50 
//                             ? 'bg-yellow-100 text-yellow-800'
//                             : 'bg-green-100 text-green-800'
//                         }`}>
//                           {product.quantity}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         ${product.price.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {product.barcode || '-'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <div className="flex space-x-2">
//                           <Link
//                             to={`/product/${product._id}`}
//                             className="text-primary hover:text-blue-900"
//                           >
//                             Edit
//                           </Link>
//                           <button
//                             onClick={() => handleDelete(product._id)}
//                             className="text-red-600 hover:text-red-900"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {filteredProducts.length === 0 && (
//                 <div className="text-center py-12">
//                   <p className="text-gray-500">
//                     {searchTerm ? 'No products found matching your search.' : 'No products found.'}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {productsAPI} from "../services/api";

export default function Inventory() {
  const [items, set] = useState([]);
  useEffect(() => {
    productsAPI.getAll({limit: 1000}).then((r) => set(r.data));
  }, []);
  return (
    <div>
      <h1 className="text-2xl">Inventory</h1>
      <Link to="/product/new" className="text-blue-600">
        Add Product
      </Link>
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i._id}>
              <td>{i.name}</td>
              <td>{i.quantity}</td>
              <td>${i.price}</td>
              <td>
                <Link to={`/product/${i._id}`} className="text-green-600">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
