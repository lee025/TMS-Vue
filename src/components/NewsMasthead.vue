<template>
  <div>
    <h1 class="brand mb-0">NewsAPI</h1>
    <div class="brand-sub">
      <span >"Democracy Dies in Darkness"</span>
      <small>- WashingtonPost</small>
    </div>
    <b-row align-h="between" class="brand-content mx-1">
      <div class="font-weight-bold">{{ currentDate }}</div>
      <div class="row brand-content">
        <div class="icon">
          <img v-if="weatherIcon" v-bind:src="`${iconURLBase}${weatherIcon}.png`"/>
        </div>
        <div class="temperature">
          <div class="degree-section">
            <div class="temp-degree"
              v-if="weather.current">
              <strong>{{ Math.round(weather.current.temp) }}°</strong>
            </div>
            <span>F</span>
          </div>
        </div>
        <div class="location">
          <div class="mr-1">{{ ip.city }}, {{ ip.region_name }}</div>
        </div>
        <div v-b-toggle.collapse-1>
          <span class="opened">
            <b-icon icon="caret-up-fill" class="caret"/>
          </span>
          <span class="closed">
            <b-icon icon="caret-down-fill" class="caret" />
          </span>
        </div>
      </div>
    </b-row>
    <b-collapse ref="dd" id="collapse-1" class="mt-2 mb-2">
<!-- Weather DropDown -->
      <b-container>
        <b-card v-if="weather.daily">
          <div class="row">
            <b-col cols="4"> <!--1 of 3 -->
              <strong>Tomorrow in {{ ip.city }}, {{ ip.region }}</strong>
              <div><img
                v-if="weatherIcon"
                v-bind:src="
                `${iconURLBase}${weather.daily[0].weather[0].icon}.png`"
              /></div>
              <p>
                The high will be {{ Math.round(weather.daily[0].temp.max) }}°
                and the low will be {{ Math.round(weather.daily[0].temp.min) }}°
                with a humidity of {{ weather.daily[0].humidity }}%.
                Wind is coming from the {{ cardinalDirections(weather.daily[0].wind_deg) }}
                at {{ weather.daily[0].wind_speed }} MPH.
              </p>
            </b-col>
            <b-col> <!--2 of 3 -->
              <b-container>
                <b-row>
                    <b-card-text class="rt-border five-day" v-for="(day, idx) in range()" :key="`daily-${idx}`">
                      <b-col class="px-0"> <!-- col -->
                          <b-card>
                            <div><strong>{{ getDay(day) }}</strong></div>
                            <div><img
                              v-if="weatherIcon"
                              v-bind:src="`${iconURLBase}${day.weather[0].icon}.png`"/>
                            </div>
                            <div>
                              {{ Math.round(day.temp.max) }}°/
                              {{ Math.round(day.temp.min) }}°
                            </div>
                            <div>{{ day.humidity }}%</div>
                          </b-card>
                      </b-col>
                    </b-card-text>
                </b-row>
              </b-container>
            </b-col>
            <!-- <b-col>3 of 3</b-col> -->
          </div>
        </b-card>
      </b-container>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: ['weather', 'weatherIcon', 'ip'],
  data () {
    return {
      days: [],
      iconURLBase: 'http://openweathermap.org/img/w/'
    }
  },
  methods: {
    range: function () {
      return this.weather.daily.slice(2, 7)
    },
    getDay: function (day) {
      let unabridgedDay = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      return unabridgedDay[new Date(day.dt * 1000).getDay().toString()]
    },
    cardinalDirections (degree) {
      const cardinalPoints = [
        'North', 'North East',
        'East', 'South East',
        'South', 'South West',
        'West', 'North West'
      ]
      degree += 22.5

      if (degree < 0) {
        degree = 360 - Math.abs(degree) % 360
      } else {
        degree = degree % 360
      }
      let point = parseInt(degree / 45)
      return cardinalPoints[point]
    }
  },
  computed: {
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
  .brand {
    /* font-family: 'Gravitas One'; */
    font-family: "Book Antiqua", Palatino, "Palatino Linotype", "Palatino LT STD", Georgia, serif;
    font-size: 3rem;
    letter-spacing: -4.5px;
    font-variant: small-caps;
    font-weight: 700;
  }
  .brand-sub {
    font-family: "Book Antiqua", Palatino, "Palatino Linotype", "Palatino LT STD", Georgia, serif;
    font-weight: bold;
    font-style: italic;
  }
  .brand-content {
    font-size: 14px;
    align-items: center;
    height: 2.5rem;
  }
  .icon {
    /* filter: grayscale(100%); */
  }
  .icon img {
    max-height: 2rem;
  }
  .degree-section {
    display: flex;
    align-items: center;
    margin-right: .5rem;
  }
  .card {
    border: none;
  }
  .rt-border {
    border-right: 1px solid rgba(0,0,0,0.125)
  }
  .caret {
    cursor: pointer;
    font-size: 0.75rem;
  }
  .collapsed > .opened,
  :not(.collapsed) > .closed {
    display: none;
  }
  #collapse-1 {
    max-width: 930px;
    margin: auto;
  }
  .five-day:last-child {
    border-right: none;
  }

  @media screen and (max-width: 990px) {
    #collapse-1 {
        display: none;
    }
    .caret {
      display: none;
    }
}
</style>
