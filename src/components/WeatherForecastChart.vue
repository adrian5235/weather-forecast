<template>
  <Chart type="line" :data="chartData" style="max-height: 55vh" />
</template>

<script setup>
const props = defineProps(['weatherForecast']);
import { computed } from "vue";

const chartData = computed(() => {
  return getChartData();
})

function getChartData() {
  return {
    labels: props.weatherForecast.times,
    datasets: [
      {
        label: 'Temperature [°C]',
        data: props.weatherForecast.temperatures,
        fill: true,
        backgroundColor: 'rgb(255, 255, 153)',
        borderColor: 'rgb(255, 209, 26)',
        tension: 0.4
      }
    ]
  };
};
</script>