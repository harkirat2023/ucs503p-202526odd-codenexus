// import React, { useState, useEffect } from 'react'
// import { transactionsAPI } from '../services/api'

// export default function Transactions() {
//   const [transactions, setTransactions] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filter, setFilter] = useState('ALL')

//   useEffect(() => {
//     loadTransactions()
//   }, [])

//   const loadTransactions = async () => {
//     try {
//       const response = await transactionsAPI.getAll()
//       setTransactions(response.data)
//     } catch (error) {
//       console.error('Error loading transactions:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const filteredTransactions = transactions.filter(transaction => {
//     if (filter === 'ALL') return true
//     return transaction.type === filter
//   })

//   if (loading) {
//     return <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//     </div>
//   }

//   return (
//     <div className="px-4 py-6 sm:px-0">
//       <div className="sm:flex sm:items-center">
//         <div className="sm:flex-auto">
//           <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
//           <p className="mt-2 text-sm text-gray-700">
//             View all inventory transactions
//           </p>
//         </div>
//       </div>

//       {/* Filter */}
//       <div className="mt-6 flex space-x-4">
//         <button
//           onClick={() => setFilter('ALL')}
//           className={`px-4 py-2 rounded-md text-sm font-medium ${
//             filter === 'ALL'
//               ? 'bg-primary text-white'
//               : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//           }`}
//         >
//           All
//         </button>
//         <button
//           onClick={() => setFilter('IN')}
//           className={`px-4 py-2 rounded-md text-sm font-medium ${
//             filter === 'IN'
//               ? 'bg-green-600 text-white'
//               : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//           }`}
//         >
//           Stock In
//         </button>
//         <button
//           onClick={() => setFilter('OUT')}
//           className={`px-4 py-2 rounded-md text-sm font-medium ${
//             filter === 'OUT'
//               ? 'bg-red-600 text-white'
//               : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//           }`}
//         >
//           Stock Out
//         </button>
//       </div>

//       {/* Transactions Table */}
//       <div className="mt-8 flex flex-col">
//         <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
//             <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
//               <table className="min-w-full divide-y divide-gray-300">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Product
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Type
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Quantity
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       User
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredTransactions.map((transaction) => (
//                     <tr key={transaction._id}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {new Date(transaction.timestamp).toLocaleString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10">
//                             {transaction.product?.imageURL ? (
//                               <img 
//                                 className="h-10 w-10 rounded-full object-cover" 
//                                 src={transaction.product.imageURL} 
//                                 alt="" 
//                               />
//                             ) : (
//                               <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
//                                 <span className="text-gray-500 text-xs">📦</span>
//                               </div>
//                             )}
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">
//                               {transaction.product?.name || 'Unknown Product'}
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               {transaction.product?.category}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                             transaction.type === 'IN'
//                               ? 'bg-green-100 text-green-800'
//                               : 'bg-red-100 text-red-800'
//                           }`}
//                         >
//                           {transaction.type === 'IN' ? 'Stock In' : 'Stock Out'}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         <span className={transaction.type === 'IN' ? 'text-green-600' : 'text-red-600'}>
//                           {transaction.type === 'IN' ? '+' : '-'}{transaction.quantity}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {transaction.user?.name || transaction.user?.email || 'Unknown User'}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {filteredTransactions.length === 0 && (
//                 <div className="text-center py-12">
//                   <p className="text-gray-500">No transactions found.</p>
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
import {transactionsAPI} from "../services/api";

export default function Transactions() {
  const [tx, setTx] = useState([]);
  useEffect(() => {
    transactionsAPI.getAll().then((r) => setTx(r.data));
  }, []);
  return (
    <div>
      <h1 className="text-2xl">Transactions</h1>
      <ul>
        {tx.map((t) => (
          <li key={t._id}>
            {new Date(t.timestamp).toLocaleString()} – {t.type} {t.quantity} of{" "}
            {t.product.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
