import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

import User from '../../user/userEntity'

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(email: string) {
    const user = await User.find({ where: { email } })
    console.log("IsUserAlreadyExistConstraint -> validate -> user", user)
    if (!user) return false
    return true
  }
}

const IsEmailAlreadyExists = (validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    })
  }
}

export default IsEmailAlreadyExists