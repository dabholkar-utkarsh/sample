import { Controller, Get } from "@nestjs/common";

@Controller()
export class HealthController {
  @Get("health")
  health() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "api",
    };
  }

  @Get("api/hello")
  hello() {
    return { message: "Hello from NestJS API" };
  }
}
