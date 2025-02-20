import { Card, CardContent, Typography, Grid } from'@mui/material'

function WeatherDisplay({ data }) {
  const { weatherData, aqiData } = data

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Weather Forecast
        </Typography>
        <Grid container spacing={2}>
          {weatherData.map((day, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1">{day.date}</Typography>
                  <Typography variant="h6">{day.temp}°C</Typography>
                  <Typography variant="body2">{day.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
          Air Quality Index
        </Typography>
        <Typography variant="h6">AQI: {aqiData.aqi}</Typography>
        <Typography variant="body1">Main Pollutant: {aqiData.mainPollutant}</Typography>
      </CardContent>
    </Card>
  )
}

export default WeatherDisplay

