import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Controller("api/users")
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list() {
    return this.prisma.client.user.findMany({ orderBy: { createdAt: "desc" } });
  }
}
