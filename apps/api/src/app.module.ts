import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ScheduleModule } from "@nestjs/schedule";
import { BullModule } from "@nestjs/bullmq";
import { join } from "path";
import { HealthModule } from "./health/health.module";
import { UsersModule } from "./users/users.module";
import { TasksModule } from "./tasks/tasks.module";
import { PrismaModule } from "./prisma/prisma.module";

const redisUrl = process.env.REDIS_URL;

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      playground: process.env.NODE_ENV !== "production",
    }),
    ScheduleModule.forRoot(),
    ...(redisUrl
      ? [
          BullModule.forRoot({
            connection: { url: redisUrl },
          }),
        ]
      : []),
    PrismaModule,
    HealthModule,
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}
