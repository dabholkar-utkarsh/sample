import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersResolver } from "./users.resolver";

@Module({
  controllers: [UsersController],
  providers: [UsersResolver],
})
export class UsersModule {}
