import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import bcrypt from 'bcryptjs'

import User from './userEntity'
import { RegisterI } from './userTypes'
import { Context } from '../types'

@Resolver(User)
class UserResolver {
  @Query(() => String)
  async user(@Ctx() ctx: Context): Promise<String> {
    const userHeader = ctx.req.headers.authorization!

    return userHeader
  }

  @Mutation(() => User)
  async register(@Arg('data') { email, firstName, lastName, password }: RegisterI): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword
    }).save()

    return user
  }
}

export default UserResolver