import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: process.env.FRONTEND_URL, // Your frontend URL
    credentials: true, // Allow cookies & headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow headers
  })
  const PORT = process.env.PORT || 3001;
  await app.listen(PORT)
}
bootstrap()
