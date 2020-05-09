<template>
  <div>
    <b-container fluid>
      <b-container>
        <h1 class="brand">NewsAPI</h1>
          <!-- Refactor Later -->
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
          <!--  -->

      </b-container>
        <div class="brand-border-bottom"></div>
      <b-row>
        <Highlights v-bind:highlights="highlights"/>
        <div v-for="(article, idx) in articles" :key="`article-${idx}`" class="mx-auto">
          <b-card
            class="card grow"
            :title="article.title"
            :img-src="article.urlToImage">
            <b-card-text @click="highlight(article, $event)" v-html="article.description">
            </b-card-text>
            <b-button @click="highlightBtn">Highlight</b-button>
            <b-button @click="readMore(article.url)">Read More</b-button>
          </b-card>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Highlights from './Highlights'
import mixin from '../mixins/mixins'
export default {
  name: 'News',
  data () {
    return {
      newsApiKey: '3541fbfb60064ba4a89453bfdb61f3c9',
      weatherApiKey: '589ce3ee2bf5caac88863b07d4f33815',
      weatherUrlBase: 'https://api.openweathermap.org/data/2.5/',
      articles: [],
      errors: [],
      highlights: [],
      lat: '',
      long: '',
      ip: {},
      weather: {},
      weatherIcon: ''
    }
  },
  components: {
    Highlights
  },
  mixins: [mixin],
  methods: {
    highlightBtn: function (e) {
      const text = e.target.previousElementSibling
      text.classList.toggle('highlight')
      text.classList.toggle('cursor')
      if (text.classList.contains('highlight')) {
        console.log(`The ${e.currentTarget.textContent} button was clicked from the ${this.currentRoute} Page! You can now hightlight text by selecting.`)
      } else {
        console.log('Highlight has been disabled.')
      }
    },
    highlight: function (article, $event) {
      const selection = window.getSelection().toString()
      if ($event.target.classList.contains('highlight') && selection) {
        const timeStamp = new Date()
        JSON.parse(JSON.stringify(this.highlights.unshift({
          timeStamp: timeStamp,
          text: selection,
          title: article.title,
          url: article.url
        })))
      }
    },
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
    },
    getWeather: function () {
      fetch(`${this.weatherUrlBase}weather?lat=${this.lat}&lon=${this.long}&units=imperial&appid=` + this.weatherApiKey)
        .then(res => res.json())
        .then(res => {
          this.weather = res
          this.weatherIcon = res.weather[0].icon
        })
    }
  },
  async created () {
    await Promise.all([
      fetch('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' + this.newsApiKey),
      fetch('https://ipapi.co/json')
    ])
      .then(async ([newsApi, ipApi]) => {
        const news = await newsApi.json()
        const ip = await ipApi.json()
        return [news, ip]
      })
      .then(response => {
        this.articles = response[0].articles.filter(data =>
          data.urlToImage !== null && data.description !== null)
        this.ip = response[1]
        this.lat = response[1].latitude
        this.long = response[1].longitude
      })

    this.getWeather()
  },
  computed: {
    currentRoute () {
      return this.$route.name
    }
  }
}
</script>

<style scoped>
  .card {
    max-width: 25rem;
    margin: 2rem;
  }
  .grow {
    transition: all .1s ease-in;
  }
  .grow:hover {
    transform: scale(1.025);
  }
  .brand {
    /* font-family: 'Gravitas One'; */
    font-family: "Book Antiqua", Palatino, "Palatino Linotype", "Palatino LT STD", Georgia, serif;
    font-size: 3rem;
    letter-spacing: -4.5px;
    font-variant: small-caps;
    font-weight: 700;
  }
  .brand-content {
    font-size: 14px;
    align-items: center;
  }
  .degree-section {
    display: flex;
    align-items: center;
    margin-right: .5rem;
  }
  .brand-border-bottom {
    border-bottom: 2px solid #343a40;
    margin: auto;
    width: 95%;
  }
  .icon {
    filter: grayscale(100%);
  }
  .icon img {
    max-height: 2rem;
  }
</style>
