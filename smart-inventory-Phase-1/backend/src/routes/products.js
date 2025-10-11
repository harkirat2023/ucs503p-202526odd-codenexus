import express from 'express'
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct, lookupBarcode } from '../controllers/productController.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()
router.get('/', requireAuth, getProducts)
router.post('/', requireAuth, createProduct)
router.get('/lookup/:code', requireAuth, lookupBarcode)
router.get('/:id', requireAuth, getProduct)
router.put('/:id', requireAuth, updateProduct)
router.delete('/:id', requireAuth, deleteProduct)

export default router
