import { Injectable } from "@nestjs/common"
import axios from "axios"

@Injectable()
export class WeatherService {
  async getWeatherAndAQI(city: string) {
    const weatherApiKey = process.env.OPENWEATHERMAP_API_KEY
    const aqiApiKey = process.env.IQAIR_API_KEY
    console.log("weather api key = ", weatherApiKey , "and qqui is ", aqiApiKey)

    const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=metric`
    const weatherResponse = await axios.get(weatherUrl)

    const lat = weatherResponse.data.city.coord.lat
    const lon = weatherResponse.data.city.coord.lon

    const aqiUrl = `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${aqiApiKey}`
    const aqiResponse = await axios.get(aqiUrl)

    const weatherData = weatherResponse.data.list.slice(0, 7).map((day) => ({
      date: day.dt_txt,
      temp: day.main.temp,
      description: day.weather[0].description,
    }))

    const aqiData = {
      aqi: aqiResponse.data.data.current.pollution.aqius,
      mainPollutant: aqiResponse.data.data.current.pollution.mainus,
    }

    return { weatherData, aqiData }
  }
}

