import Transaction from '../models/Transaction.js'
import Product from '../models/Product.js'

export const createTransaction = async (req, res) => {
  const { product: productId, type, quantity } = req.body
  const tx = new Transaction({ product: productId, type, quantity, user: req.user._id })
  await tx.save()

  const product = await Product.findById(productId)
  if (!product) return res.status(404).json({ message: 'Product not found' })
  if (type === 'IN') product.quantity += Number(quantity)
  else product.quantity -= Number(quantity)
  product.lastUpdated = new Date()
  await product.save()

  res.json(tx)
}

export const getTransactions = async (req, res) => {
  const list = await Transaction.find().populate('product').populate('user').sort({ timestamp: -1 }).limit(200)
  res.json(list)
}
