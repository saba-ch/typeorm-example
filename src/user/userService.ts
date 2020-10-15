import User from './userEntity'
import { hashService, jwtService } from '../shared/services'

import { AccessTokenI, RegisterI, LoginI } from './userTypes'

const register = async ({ email, firstName, lastName, password }: RegisterI): Promise<AccessTokenI> => {
  const hashedPassword = await hashService.hash(password)

  const user = await User.create({
    email,
    firstName,
    lastName,
    password: hashedPassword
  }).save()

  const accessToken = jwtService.sign({ id: user.id.toString() })

  return { accessToken }
}

const login = async ({ email, password }: LoginI): Promise<AccessTokenI> => {
  const user = await User.findOne({ email })
  if (!user) throw new Error('User doesn\'t exist')

  const isValidPassword = hashService.compare(user.password, password)
  if (!isValidPassword) throw new Error('Invalid password')

  const accessToken = jwtService.sign({ id: user.id.toString() })

  return { accessToken }
}

export default {
  register,
  login
}