import jwt from 'jsonwebtoken'

const sign = (payload: { id: string }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!)
  return `Bearer ${token}`
}

const verify = (token: string): { id: string } | null => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
    return payload
  } catch (err) {
    return null
  }
}

export default {
  sign,
  verify
}