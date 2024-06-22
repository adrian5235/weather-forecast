import axios from 'axios';

class WeatherService {

  getLocationLatitudeAndLongitude(location) {
    const response = axios({
      method: 'get',
      url: 'https://geocoding-api.open-meteo.com/v1/search',
      params: {
        name: location,
        count: 1
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    return response;
  }

  getWeatherForecastForNextSevenDays(latitude, longitude) {
    const response = axios({
      method: 'get',
      url: 'https://api.open-meteo.com/v1/forecast',
      params: {
        latitude: latitude,
        longitude: longitude,
        current: 'temperature_2m',
        hourly: 'temperature_2m'
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    return response;
  }
}

export default new WeatherService();