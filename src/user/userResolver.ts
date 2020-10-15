import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import User from './userEntity'
import userService from './userService'

import { RegisterI, AccessTokenI, LoginI } from './userTypes'
import { Context } from '../types'

@Resolver(User)
class UserResolver {
  @Authorized()
  @Query(() => User)
  async user(@Ctx() ctx: Context): Promise<User> {
    return ctx.user!
  }

  @Mutation(() => AccessTokenI)
  async register(@Arg('data') data: RegisterI): Promise<AccessTokenI> {
    return await userService.register(data)
  }

  @Mutation(() => AccessTokenI)
  async login(@Arg('data') data: LoginI): Promise<AccessTokenI> {
    return await userService.login(data)
  }
}

export default UserResolver