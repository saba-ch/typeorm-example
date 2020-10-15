import { IsEmail, IsString } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

import { IsEmailAlreadyExists } from '../decorators/validation'

@InputType()
export class RegisterI {
  @Field()
  @IsString()
  firstName: string

  @Field()
  @IsString()
  lastName: string

  @Field()
  @IsString()
  password: string

  @Field()
  @IsEmail()
  @IsEmailAlreadyExists({ message: 'email already in use' })
  email: string
}

@InputType()
export class LoginI {
  @Field()
  @IsString()
  password: string

  @Field()
  @IsEmail()
  email: string
}

@ObjectType()
export class AccessTokenI {
  @Field()
  accessToken: string
}