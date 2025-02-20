import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { WeatherModule } from "./weather/weather.module"

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI|| "mongodb+srv://choudharyprateek131:9927729187@cluster0.nkeq4ce.mongodb.net/weather-app?retryWrites=true&w=majority&appName=Cluster0"),
    AuthModule,
    UsersModule,
    WeatherModule,
  ],
})
export class AppModule {}

