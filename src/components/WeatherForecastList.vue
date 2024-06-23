<template>
  <DataTable :value="timesAndTemperatures">
    <Column field="time" header="Time"></Column>
    <Column field="temperature" header="Temperature [°C]"></Column>
  </DataTable>
</template>

<script setup>
const props = defineProps(['weatherForecast']);
import { computed } from "vue";

const timesAndTemperatures = computed(() => {
  return getTimesAndTemperatures();
})

function getTimesAndTemperatures() {
  let timesAndTemperatures = [];
  let times = props.weatherForecast.times;
  let temperatures = props.weatherForecast.temperatures;

  for (let index = 0; index < times.length; index++) {
    timesAndTemperatures.push({
      time: times[index], 
      temperature: Number.parseFloat(temperatures[index]).toFixed(1)
    });
  }

  return timesAndTemperatures;
}
</script>