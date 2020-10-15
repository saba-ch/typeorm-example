import { Field, ID, ObjectType, Root } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Field()
  @Column('text', { unique: true })
  email: string

  @Field()
  @Column('boolean', { nullable: true })
  confirmed: boolean

  @Column('text', { unique: true })
  confirm_id: string

  @Column('text', { nullable: true })
  forgot_password_id: string

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`
  }

  @Column()
  password: string
}

export default User