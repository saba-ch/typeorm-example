import { Request } from 'express'

import User from '../user/userEntity'

interface Context {
  req: Request
  user?: User
}
export default Context