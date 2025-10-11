import express from 'express'
import { createTransaction, getTransactions } from '../controllers/transactionController.js'
import { requireAuth } from '../middleware/auth.js'

const router = express.Router()
router.post('/', requireAuth, createTransaction)
router.get('/', requireAuth, getTransactions)

export default router
