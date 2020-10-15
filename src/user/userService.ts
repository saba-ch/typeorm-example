import * as uuid from 'uuid'

import User from './userEntity'
import { hashService, jwtService, mailService } from '../shared/services'

import { AccessTokenI, RegisterI, LoginI } from './userTypes'

const register = async ({ email, firstName, lastName, password }: RegisterI): Promise<AccessTokenI> => {
  const hashedPassword = await hashService.hash(password)
  const confirm_id = uuid.v4()

  const user = await User.create({
    email,
    firstName,
    lastName,
    password: hashedPassword,
    confirm_id
  }).save()

  await mailService.send(confirm_id)

  const accessToken = jwtService.sign({ id: user.id.toString() })

  return { accessToken }
}

const login = async ({ email, password }: LoginI): Promise<AccessTokenI> => {
  const user = await User.findOne({ email })
  if (!user) throw new Error('User doesn\'t exist')

  const isValidPassword = await hashService.compare(user.password, password)
  if (!isValidPassword) throw new Error('Invalid password')

  const accessToken = jwtService.sign({ id: user.id.toString() })

  return { accessToken }
}

const confirmEmail = async (confirm_id: string): Promise<AccessTokenI> => {
  // @ts-ignore
  const user = await User.findOne({ confirm_id, confirmed: null })
  if (!user) throw new Error('Invalid link')

  await User.update({ confirm_id }, { confirmed: true })

  const accessToken = jwtService.sign({ id: user.id.toString() })

  return { accessToken }
}

const forgotPassword = async (email: string): Promise<boolean> => {
  const user = await User.findOne({ email })
  if (!user) return true

  const forgot_password_id = uuid.v4()

  await User.update({ email }, { forgot_password_id })

  await mailService.send(forgot_password_id)

  return true
}

const recoverPassword = async (forgot_password_id: string, new_password: string): Promise<AccessTokenI> => {
  const user = await User.findOne({ forgot_password_id })
  if (!user) throw new Error('Invalid id')

  const hashedPassword = await hashService.hash(new_password)

  await User.update({ forgot_password_id }, { forgot_password_id: '', password: hashedPassword })

  const accessToken = jwtService.sign({ id: user.id.toString() })

  return { accessToken }
}

export default {
  register,
  login,
  confirmEmail,
  forgotPassword,
  recoverPassword
}