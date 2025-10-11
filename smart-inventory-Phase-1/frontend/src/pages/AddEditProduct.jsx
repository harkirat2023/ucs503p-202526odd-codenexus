// import React, { useState, useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { productsAPI } from '../services/api'

// export default function AddEditProduct() {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const isEdit = Boolean(id)

//   const [formData, setFormData] = useState({
//     name: '',
//     category: 'General',
//     quantity: 0,
//     price: 0,
//     barcode: '',
//     description: '',
//     imageURL: ''
//   })
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     if (isEdit) {
//       loadProduct()
//     }
//   }, [id, isEdit])

//   const loadProduct = async () => {
//     try {
//       const response = await productsAPI.getById(id)
//       setFormData(response.data)
//     } catch (error) {
//       console.error('Error loading product:', error)
//       setError('Error loading product')
//     }
//   }

//   const handleChange = (e) => {
//     const { name, value, type } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'number' ? parseFloat(value) || 0 : value
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)

//     try {
//       if (isEdit) {
//         await productsAPI.update(id, formData)
//       } else {
//         await productsAPI.create(formData)
//       }
//       navigate('/inventory')
//     } catch (error) {
//       console.error('Error saving product:', error)
//       setError(error.response?.data?.message || 'Error saving product')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="px-4 py-6 sm:px-0">
//       <div className="md:grid md:grid-cols-3 md:gap-6">
//         <div className="md:col-span-1">
//           <div className="px-4 sm:px-0">
//             <h3 className="text-lg font-medium leading-6 text-gray-900">
//               {isEdit ? 'Edit Product' : 'Add New Product'}
//             </h3>
//             <p className="mt-1 text-sm text-gray-600">
//               {isEdit ? 'Update product information' : 'Add a new product to your inventory'}
//             </p>
//           </div>
//         </div>
//         <div className="mt-5 md:mt-0 md:col-span-2">
//           <form onSubmit={handleSubmit}>
//             <div className="shadow sm:rounded-md sm:overflow-hidden">
//               <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
//                 {error && (
//                   <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//                     {error}
//                   </div>
//                 )}

//                 <div className="grid grid-cols-6 gap-6">
//                   <div className="col-span-6 sm:col-span-4">
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                       Product Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       id="name"
//                       required
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div className="col-span-6 sm:col-span-3">
//                     <label htmlFor="category" className="block text-sm font-medium text-gray-700">
//                       Category
//                     </label>
//                     <input
//                       type="text"
//                       name="category"
//                       id="category"
//                       value={formData.category}
//                       onChange={handleChange}
//                       className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div className="col-span-6 sm:col-span-3">
//                     <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">
//                       Barcode
//                     </label>
//                     <input
//                       type="text"
//                       name="barcode"
//                       id="barcode"
//                       value={formData.barcode}
//                       onChange={handleChange}
//                       className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div className="col-span-6 sm:col-span-3">
//                     <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
//                       Quantity *
//                     </label>
//                     <input
//                       type="number"
//                       name="quantity"
//                       id="quantity"
//                       required
//                       min="0"
//                       value={formData.quantity}
//                       onChange={handleChange}
//                       className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div className="col-span-6 sm:col-span-3">
//                     <label htmlFor="price" className="block text-sm font-medium text-gray-700">
//                       Price *
//                     </label>
//                     <input
//                       type="number"
//                       name="price"
//                       id="price"
//                       required
//                       min="0"
//                       step="0.01"
//                       value={formData.price}
//                       onChange={handleChange}
//                       className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div className="col-span-6">
//                     <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700">
//                       Image URL
//                     </label>
//                     <input
//                       type="url"
//                       name="imageURL"
//                       id="imageURL"
//                       value={formData.imageURL}
//                       onChange={handleChange}
//                       className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div className="col-span-6">
//                     <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//                       Description
//                     </label>
//                     <textarea
//                       id="description"
//                       name="description"
//                       rows={3}
//                       value={formData.description}
//                       onChange={handleChange}
//                       className="mt-1 shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border border-gray-300 rounded-md"
//                       placeholder="Product description..."
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => navigate('/inventory')}
//                   className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
//                 >
//                   {loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }
import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {productsAPI} from "../services/api";

export default function AddEditProduct() {
  const {id} = useParams();
  const nav = useNavigate();
  const [f, setF] = useState({
    name: "",
    category: "General",
    quantity: 0,
    price: 0,
  });
  useEffect(() => {
    if (id) productsAPI.getById(id).then((r) => setF(r.data));
  }, [id]);

  const save = async (e) => {
    e.preventDefault();
    if (id) await productsAPI.update(id, f);
    else await productsAPI.create(f);
    nav("/inventory");
  };

  return (
    <form onSubmit={save} className="space-y-4">
      <h1 className="text-xl">{id ? "Edit" : "Add"} Product</h1>
      <input
        placeholder="Name"
        value={f.name}
        onChange={(e) => setF({...f, name: e.target.value})}
        className="border p-2 w-full"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={f.quantity}
        onChange={(e) => setF({...f, quantity: +e.target.value})}
        className="border p-2 w-full"
      />
      <input
        type="number"
        placeholder="Price"
        step="0.01"
        value={f.price}
        onChange={(e) => setF({...f, price: +e.target.value})}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        {id ? "Update" : "Create"}
      </button>
    </form>
  );
}
