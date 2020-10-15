import bcrypt from 'bcryptjs'

const hash = async (str: string) => {
  const hashed = await bcrypt.hash(str, 12)
  return hashed
}

const compare = async (str1: string, str2: string) => {
  const isValid = await bcrypt.compare(str2, str1)
  return isValid
}

export default {
  compare,
  hash
}