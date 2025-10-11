import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { name, email, password, role } = req.body
  const user = new User({ name, email, password, role })
  await user.save()
  res.json({ message: 'User created' })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ message: 'Invalid credentials' })
  const ok = await user.comparePassword(password)
  if (!ok) return res.status(400).json({ message: 'Invalid credentials' })
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
}
