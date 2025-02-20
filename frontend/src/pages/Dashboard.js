import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextField, Button, Container, Typography } from "@mui/material"
import WeatherDisplay from "../components/WeatherDisplay" // Make sure you have this component
import { getWeather } from "../services/api.js" // Assuming the getWeather API function is set up correctly

function Dashboard() {
  const [user, setUser] = useState(null)
  const [city, setCity] = useState("") // City input state
  const [weatherData, setWeatherData] = useState(null) // Weather data state
  const navigate = useNavigate()

  //Function to handle the city search
  const handleSearch = async () => {
    try {
      const data = await getWeather(city)
      setWeatherData(data) // Set the weather data after calling API
      console.log("dataa is here ", data)
    } catch (error) {
      console.error("Error fetching weather data:", error)
    }
  }

  const handleAdmin = async()=>{
    navigate("/admin")
    console.log(user)
  }

  

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")

    if (token) {
      localStorage.setItem("token", token) // Store the token
      window.history.replaceState({}, document.title, "/dashboard") // Remove token from URL

      const userData = JSON.parse(atob(token.split(".")[1])) // Decode JWT payload
      setUser(userData)
    } else {
      const savedToken = localStorage.getItem("token")
      if (!savedToken) {
        navigate("/") // Redirect to login if no token
      } else {
        const userData = JSON.parse(atob(savedToken.split(".")[1]))
        setUser(userData)
      }
    }
  }, [navigate])

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Welcome, {user?.firstName}!
      </Typography>

      {/* City input form */}
      <TextField
        fullWidth
        label="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      <Button variant="contained" color="primary" onClick={handleAdmin}>
        Go To Admin Panel
      </Button>

      {/* Display weather data if available */}
      {weatherData && <WeatherDisplay data={weatherData} />}
    </Container>
  )
}

export default Dashboard
