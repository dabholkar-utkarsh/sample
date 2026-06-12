import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "../prisma/prisma.service";
import { UserModel } from "./user.model";

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => String)
  hello(): string {
    return "Hello from GraphQL";
  }

  @Query(() => [UserModel])
  async users(): Promise<UserModel[]> {
    return this.prisma.client.user.findMany({ orderBy: { createdAt: "desc" } });
  }

  @Mutation(() => UserModel)
  async createUser(
    @Args("email") email: string,
    @Args("name", { nullable: true }) name?: string,
  ): Promise<UserModel> {
    return this.prisma.client.user.create({
      data: { email, name },
    });
  }
}
