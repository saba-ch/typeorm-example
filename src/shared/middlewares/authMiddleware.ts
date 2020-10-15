import { Request } from 'express'
import { AuthChecker, UnauthorizedError } from 'type-graphql'

import User from '../../user/userEntity'

import jwtService from '../services/jwtService'

const customAuthChecker: AuthChecker<{ req: Request, user?: User }> = async ({ context }) => {
  let { authorization } = context.req.headers
  if (!authorization) throw new Error('Authorization header not provided')

  if (authorization.includes('Bearer')) authorization = authorization.slice(7)

  try {
    const jwtPayload = jwtService.verify(authorization)
    if (!jwtPayload) throw new UnauthorizedError()

    const user = await User.findOne({ id: parseInt(jwtPayload.id) })
    if (!user) throw new UnauthorizedError()

    context.user = user
    return true
  } catch (err) {
    throw new UnauthorizedError()
  }
}

export default customAuthChecker