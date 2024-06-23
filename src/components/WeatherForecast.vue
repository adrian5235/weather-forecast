<template>
  <Toast />
  <h2>Enter your location</h2>
  <div class="flex gap-2">
    <InputText id="location" v-model="location" />
    <Button label="Get forecast" @click="getWeatherForecastForNextSevenDaysAndFormatIt()" raised />
  </div>

  <div v-if="weatherForecast">
    <hr>
    <h2>Weather forecast for {{ locationEntered }}</h2>
      <div class="flex gap-2">
        <span v-for="(day, index) in weatherForecast" :key="day">
          <Button v-if="chosenDayIndex == index" disabled @click="chosenDayIndex = index" severity="info" :label="weatherForecast[index].day" raised />
          <Button v-else @click="chosenDayIndex = index" severity="info" :label="weatherForecast[index].day" raised />
        </span>
      </div>

    <div class="flex gap-2 py-3">
      <Button label="Chart" v-if="isWeatherForecastChartVisible" disabled @click="showWeatherForecastChart()" severity="secondary" raised />
      <Button label="Chart" v-else @click="showWeatherForecastChart()" severity="secondary" raised />
      <Button label="List" v-if="isWeatherForecastListVisible" disabled @click="showWeatherForecastList()" severity="secondary" raised />
      <Button label="List" v-else @click="showWeatherForecastList()" severity="secondary" raised />
    </div>

    <div class="py-3">
      <WeatherForecastList v-if="isWeatherForecastListVisible" :weatherForecast="weatherForecast[chosenDayIndex]" />
      <WeatherForecastChart v-if="isWeatherForecastChartVisible" :weatherForecast="weatherForecast[chosenDayIndex]" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import WeatherService from '../services/WeatherService';
import WeatherForecastList from './WeatherForecastList.vue';
import WeatherForecastChart from './WeatherForecastChart.vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const location = ref('');
const locationEntered = ref('');
const chosenDayIndex = ref(0);
const isWeatherForecastListVisible = ref(false);
const isWeatherForecastChartVisible = ref(true);
const weatherForecast = ref(null);

const dayNames = [
    'mon.',
    'tue.',
    'wed.',
    'thu.',
    'fri.',
    'sat.',
    'sun.'
];

function getWeatherForecastForNextSevenDaysAndFormatIt() {
  WeatherService.getLocationLatitudeAndLongitude(location.value).then((response) => {
    if (!response.data.results) {
      toast.add({ severity: 'error', summary: 'Something went wrong', detail: 'Could not fetch the weather forecast. Check if the entered location name is correct.', life: 3000 });
    } else {
      let locationLatitude = response.data.results[0].latitude;
      let locationLongitude = response.data.results[0].longitude;
      WeatherService.getWeatherForecastForNextSevenDays(locationLatitude, locationLongitude).then((response) => {
        toast.add({ severity: 'success', summary: 'Success', detail: 'The weather forecast has been succesfully fetched.', life: 3000 });
        locationEntered.value = location.value;
        formatWeatherForecast(response.data);
      });
    }
  });
}

function formatWeatherForecast(fetchedWeatherForecast) {
  let times = fetchedWeatherForecast.hourly.time;
  let temperatures = fetchedWeatherForecast.hourly.temperature_2m;
  weatherForecast.value = getFormattedWeatherForecast(times, temperatures);
}

function getFormattedWeatherForecast(times, temperatures) {
  let weatherForecastFormatted = [];
  let currentFetchedArrayIndex = 0;
  let today = new Date().getDay() - 1;

  for (let day = 0; day < 7; day++) {
    let newTimes = [];
    let newTemperatures = [];
    
    for (let hour = 0; hour < 24; hour++) {
      let date = new Date(times[hour + currentFetchedArrayIndex]);
      if (isHourEarlierThanTenAm(date)) {
        newTimes.push("0" + date.getHours() + ":00");
      } else {
        newTimes.push(date.getHours() + ":00");
      }
      newTemperatures.push(temperatures[hour + currentFetchedArrayIndex]);
    }
    currentFetchedArrayIndex += 24;

    weatherForecastFormatted.push({
      day: getDay(today + day),
      times: newTimes,
      temperatures: newTemperatures
    });
  }

  return weatherForecastFormatted;
}

function isHourEarlierThanTenAm(date) {
  return `${date.getHours()}`.length < 2;
}

function getDay(dayNumber) {
  if (dayNumber >= dayNames.length) {
    dayNumber -= dayNames.length;
  } else if (dayNumber < 0) {
    dayNumber += dayNames.length;
  }

  return dayNames[dayNumber];
}

function showWeatherForecastList() {
  isWeatherForecastChartVisible.value = false;
  isWeatherForecastListVisible.value = true;
}

function showWeatherForecastChart() {
  isWeatherForecastListVisible.value = false;
  isWeatherForecastChartVisible.value = true;
}
</script>