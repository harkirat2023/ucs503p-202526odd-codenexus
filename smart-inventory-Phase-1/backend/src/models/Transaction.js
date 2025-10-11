import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  type: { type: String, enum: ['IN','OUT'], required: true },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

export default mongoose.model('Transaction', transactionSchema)
