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

  @Mutation(() => AccessTokenI)
  async confirmEmail(@Arg('confirm_id') confirm_id: string): Promise<AccessTokenI> {
    return await userService.confirmEmail(confirm_id)
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    return await userService.forgotPassword(email)
  }

  @Mutation(() => AccessTokenI)
  async recoverPassword(
    @Arg('forgot_password_id') forgot_password_id: string,
    @Arg('new_password') new_password: string,
  ): Promise<AccessTokenI> {
    return await userService.recoverPassword(forgot_password_id, new_password)
  }
}

export default UserResolver