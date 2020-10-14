import { IsEmail, IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'

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
  email: string
}