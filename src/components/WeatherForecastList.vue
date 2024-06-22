<template>
  <div v-if="weatherForecast" class="flex flex-wrap gap-2">
    <span v-for="(hour, index) in weatherForecast.times" :key="hour">
      <span>{{ hour }}</span>
      <span>{{ " " + weatherForecast.temperatures[index] }}°C</span>
      <span v-if="index < weatherForecast.times.length - 1">, </span>
    </span>
  </div>
</template>

<script setup>
const props = defineProps(['weatherForecast']);
</script>