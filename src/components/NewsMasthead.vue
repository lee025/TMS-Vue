<template>
  <b-row align-h="between" class="brand-content mx-1">
    <div class="font-weight-bold">{{ currentDate() }}</div>
    <div class="row brand-content">
      <div class="icon">
        <img v-if="weatherIcon" v-bind:src="`http://openweathermap.org/img/w/${weatherIcon}.png`"/>
      </div>
      <div class="temperature">
        <div class="degree-section">
          <div class="temp-degree" v-if="weather.main"><strong>{{ weather.main.temp }}°</strong></div>
          <span>F</span>
        </div>
      </div>
      <div class="location">
        <div class="time-zone">{{ weather.name }}</div>
      </div>
    </div>
  </b-row>
</template>

<script>
export default {
  props: ['weather', 'weatherIcon'],
  methods: {
    currentDate: function () {
      let date = new Date()
      let monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
      let month = monthNames[date.getMonth()]
      let day = date.getDate()
      let year = date.getFullYear()

      return month + ' ' + day + ', ' + year
    }
  }
}
</script>

<style scoped>
  .brand-content {
    font-size: 14px;
    align-items: center;
  }
  .degree-section {
    display: flex;
    align-items: center;
    margin-right: .5rem;
  }
</style>
