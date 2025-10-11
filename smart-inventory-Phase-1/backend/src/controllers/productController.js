import Product from '../models/Product.js'
import Transaction from '../models/Transaction.js'
import axios from 'axios'

export const createProduct = async (req, res) => {
  const doc = new Product(req.body)
  await doc.save()
  res.json(doc)
}

export const getProducts = async (req, res) => {
  const { page = 1, limit = 50, barcode, q } = req.query
  const filter = {}
  if (barcode) filter.barcode = barcode
  if (q) filter.name = { $regex: q, $options: 'i' }
  const products = await Product.find(filter).skip((page-1)*limit).limit(Number(limit))
  res.json(products)
}

export const getProduct = async (req, res) => {
  const p = await Product.findById(req.params.id)
  if (!p) return res.status(404).json({ message: 'Not found' })
  res.json(p)
}

export const updateProduct = async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(p)
}

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted' })
}

export const lookupBarcode = async (req, res) => {
  const { code } = req.params
  try {
    const resp = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
    if (resp.data?.product) return res.json({ found: true, data: resp.data.product })
  } catch (e) {}
  res.json({ found: false })
}
