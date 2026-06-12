import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserModel {
  @Field()
  id!: string;

  @Field()
  email!: string;

  @Field({ nullable: true })
  name?: string | null;

  @Field()
  createdAt!: Date;
}
