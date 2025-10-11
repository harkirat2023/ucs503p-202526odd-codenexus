import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  category: { type: String, default: 'General' },
  quantity: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  barcode: { type: String, unique: true, index: true },
  description: String,
  imageURL: String,
  lastUpdated: { type: Date, default: Date.now }
})

export default mongoose.model('Product', productSchema)
