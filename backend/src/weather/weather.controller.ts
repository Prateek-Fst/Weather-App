import { Controller, Get, Query } from "@nestjs/common"
import { WeatherService } from "./weather.service"

@Controller("weather")
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query("city") city: string) {
    return this.weatherService.getWeatherAndAQI(city)
  }
}
