// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { productsAPI, transactionsAPI } from '../services/api'

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     lowStock: 0,
//     recentTransactions: 0,
//     totalValue: 0
//   })
//   const [recentTransactions, setRecentTransactions] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     loadDashboardData()
//   }, [])

//   const loadDashboardData = async () => {
//     try {
//       const [productsRes, transactionsRes] = await Promise.all([
//         productsAPI.getAll({ limit: 1000 }),
//         transactionsAPI.getAll()
//       ])

//       const products = productsRes.data
//       const transactions = transactionsRes.data

//       const lowStock = products.filter(p => p.quantity < 10).length
//       const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0)
//       const recentTransactionsCount = transactions.filter(t => {
//         const transactionDate = new Date(t.timestamp)
//         const weekAgo = new Date()
//         weekAgo.setDate(weekAgo.getDate() - 7)
//         return transactionDate > weekAgo
//       }).length

//       setStats({
//         totalProducts: products.length,
//         lowStock,
//         recentTransactions: recentTransactionsCount,
//         totalValue
//       })

//       setRecentTransactions(transactions.slice(0, 5))
//     } catch (error) {
//       console.error('Error loading dashboard data:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) {
//     return <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//     </div>
//   }

//   return (
//     <div className="px-4 py-6 sm:px-0">
//       <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
//         <div className="bg-white overflow-hidden shadow rounded-lg">
//           <div className="p-5">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
//                   <span className="text-white text-sm font-medium">📦</span>
//                 </div>
//               </div>
//               <div className="ml-5 w-0 flex-1">
//                 <dl>
//                   <dt className="text-sm font-medium text-gray-500 truncate">
//                     Total Products
//                   </dt>
//                   <dd className="text-lg font-medium text-gray-900">
//                     {stats.totalProducts}
//                   </dd>
//                 </dl>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white overflow-hidden shadow rounded-lg">
//           <div className="p-5">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
//                   <span className="text-white text-sm font-medium">⚠️</span>
//                 </div>
//               </div>
//               <div className="ml-5 w-0 flex-1">
//                 <dl>
//                   <dt className="text-sm font-medium text-gray-500 truncate">
//                     Low Stock Items
//                   </dt>
//                   <dd className="text-lg font-medium text-gray-900">
//                     {stats.lowStock}
//                   </dd>
//                 </dl>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white overflow-hidden shadow rounded-lg">
//           <div className="p-5">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
//                   <span className="text-white text-sm font-medium">📊</span>
//                 </div>
//               </div>
//               <div className="ml-5 w-0 flex-1">
//                 <dl>
//                   <dt className="text-sm font-medium text-gray-500 truncate">
//                     Recent Transactions
//                   </dt>
//                   <dd className="text-lg font-medium text-gray-900">
//                     {stats.recentTransactions}
//                   </dd>
//                 </dl>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white overflow-hidden shadow rounded-lg">
//           <div className="p-5">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
//                   <span className="text-white text-sm font-medium">💰</span>
//                 </div>
//               </div>
//               <div className="ml-5 w-0 flex-1">
//                 <dl>
//                   <dt className="text-sm font-medium text-gray-500 truncate">
//                     Total Inventory Value
//                   </dt>
//                   <dd className="text-lg font-medium text-gray-900">
//                     ${stats.totalValue.toFixed(2)}
//                   </dd>
//                 </dl>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
//         <Link
//           to="/product/new"
//           className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary rounded-lg shadow hover:shadow-md transition-shadow"
//         >
//           <div>
//             <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//             </span>
//           </div>
//           <div className="mt-8">
//             <h3 className="text-lg font-medium">
//               <span className="absolute inset-0" aria-hidden="true" />
//               Add New Product
//             </h3>
//             <p className="mt-2 text-sm text-gray-500">
//               Add a new product to your inventory
//             </p>
//           </div>
//         </Link>

//         <Link
//           to="/scanner"
//           className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary rounded-lg shadow hover:shadow-md transition-shadow"
//         >
//           <div>
//             <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
//               </svg>
//             </span>
//           </div>
//           <div className="mt-8">
//             <h3 className="text-lg font-medium">
//               <span className="absolute inset-0" aria-hidden="true" />
//               Scan Barcode
//             </h3>
//             <p className="mt-2 text-sm text-gray-500">
//               Scan product barcodes for quick lookup
//             </p>
//           </div>
//         </Link>

//         <Link
//           to="/inventory"
//           className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary rounded-lg shadow hover:shadow-md transition-shadow"
//         >
//           <div>
//             <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white">
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//               </svg>
//             </span>
//           </div>
//           <div className="mt-8">
//             <h3 className="text-lg font-medium">
//               <span className="absolute inset-0" aria-hidden="true" />
//               View Inventory
//             </h3>
//             <p className="mt-2 text-sm text-gray-500">
//               Browse and manage your product inventory
//             </p>
//           </div>
//         </Link>
//       </div>

//       {/* Recent Transactions */}
//       <div className="bg-white shadow rounded-lg">
//         <div className="px-4 py-5 sm:p-6">
//           <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//             Recent Transactions
//           </h3>
//           {recentTransactions.length > 0 ? (
//             <div className="flow-root">
//               <ul className="-mb-8">
//                 {recentTransactions.map((transaction, idx) => (
//                   <li key={transaction._id}>
//                     <div className="relative pb-8">
//                       {idx !== recentTransactions.length - 1 && (
//                         <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
//                       )}
//                       <div className="relative flex space-x-3">
//                         <div>
//                           <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
//                             transaction.type === 'IN' ? 'bg-green-500' : 'bg-red-500'
//                           }`}>
//                             <span className="text-white text-xs">
//                               {transaction.type === 'IN' ? '+' : '-'}
//                             </span>
//                           </span>
//                         </div>
//                         <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
//                           <div>
//                             <p className="text-sm text-gray-500">
//                               {transaction.type === 'IN' ? 'Added' : 'Removed'}{' '}
//                               <span className="font-medium text-gray-900">
//                                 {transaction.quantity}
//                               </span>{' '}
//                               {transaction.product?.name || 'Unknown Product'}
//                             </p>
//                           </div>
//                           <div className="text-right text-sm whitespace-nowrap text-gray-500">
//                             {new Date(transaction.timestamp).toLocaleDateString()}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ) : (
//             <p className="text-gray-500 text-center py-4">No recent transactions</p>
//           )}
//           <div className="mt-6">
//             <Link
//               to="/transactions"
//               className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//             >
//               View all transactions
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
import React, {useEffect, useState} from "react";
import {productsAPI, transactionsAPI} from "../services/api";

export default function Dashboard() {
  const [stats, set] = useState({});
  useEffect(() => {
    (async () => {
      const p = await productsAPI.getAll({limit: 1000});
      const t = await transactionsAPI.getAll();
      set({
        total: p.data.length,
        low: p.data.filter((x) => x.quantity < 10).length,
        recent: t.data.slice(0, 5),
      });
    })();
  }, []);
  return (
    <div>
      <h1 className="text-2xl">Dashboard</h1>
      <p>Total Products: {stats.total}</p>
      <p>Low Stock: {stats.low}</p>
      <h2>Recent Transactions</h2>
      <ul>
        {stats.recent?.map((tx) => (
          <li key={tx._id}>
            {tx.type} {tx.quantity} – {new Date(tx.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
