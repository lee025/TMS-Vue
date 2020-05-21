<template>
  <div>
    <b-container fluid>
      <b-container>
        <NewsMasthead
          v-bind:weather="weather"
          v-bind:weatherIcon="weatherIcon"
          v-bind:ip="ip"
        />
      </b-container>
      <div class="brand-border-bottom"></div>
      <b-row>
        <Highlights v-bind:highlights="highlights"/>
        <div v-for="(article, idx) in articles" :key="`article-${idx}`" class="mx-auto">
          <b-card
            class="card grow"
            :title="article.title"
            :img-src="article.urlToImage">
            <b-card-text
              @click="highlight(article, $event)"
              v-html="article.description.replace(/(<([^>]+)>)/ig, '')">
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
import NewsMasthead from './NewsMasthead'
import mixin from '../mixins/mixins'
export default {
  name: 'News',
  data () {
    return {
      newsApiKey: '3541fbfb60064ba4a89453bfdb61f3c9',
      weatherApiKey: '589ce3ee2bf5caac88863b07d4f33815',
      ipapiKey: '87424963eed5d0d15e836caf5ac5e38d',
      weatherUrlBase: 'https://api.openweathermap.org/data/2.5/',
      articles: [],
      errors: [],
      highlights: [],
      lat: '',
      long: '',
      ip: {},
      weather: {},
      weatherIcon: '',
      ipAddress: ''
    }
  },
  components: {
    Highlights,
    NewsMasthead
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
    getWeather: function () {
      fetch(`${this.weatherUrlBase}onecall?lat=${this.lat}&lon=${this.long}&units=imperial&appid=` + this.weatherApiKey)
        .then(res => res.json())
        .then(res => {
          this.weather = res
          this.weatherIcon = res.current.weather[0].icon
        })
    }
  },
  async created () {
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    await Promise.all([
      fetch(proxy + 'http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' + this.newsApiKey),
      // fetch('http://newsapi.org/v2/everything?domains=wsj.com&apiKey=' + this.newsApiKey),
      // fetch('https://ipapi.co/json/')
      fetch('https://api.ipify.org?format=json')
    ])
      .then(async ([newsApi, ipApi]) => {
        const news = await newsApi.json()
        const ip = await ipApi.json()
        //
        return [news, ip]
      })
      .then(response => {
        this.articles = response[0].articles.filter(data =>
          data.urlToImage !== null &&
          data.description !== null &&
          data.description !== ''
        )
        this.ipAddress = response[1].ip
      })
    fetch(`http://api.ipapi.com/api/${this.ipAddress}?access_key=` + this.ipapiKey)
      .then(response => response.json())
      .then(data => {
        this.ip = data
        this.lat = data.latitude
        this.long = data.longitude
        this.getWeather()
      })
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
    max-width: 20rem;
    max-width: 20rem;
    margin: 1rem;
    box-shadow: 0px 6px 6px -1px rgba(0,0,0,0.4);
  }
  .card-title {
    font-size: 1.2rem;
  }
  .grow {
    transition: all .1s ease-in;
  }
  .grow:hover {
    transform: scale(1.025);
  }
  .brand-border-bottom {
    border-bottom: 2px solid #343a40;
    margin: auto;
    width: 95%;
  }
</style>
