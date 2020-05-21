<template>
<b-container fluid>
  <b-container>
    <NewsMasthead
      v-bind:weather="weather"
      v-bind:weatherIcon="weatherIcon"
      v-bind:ip="ip"
    />
  </b-container>
  <div class="brand-border-bottom"></div>
  <!--  -->
  <div class="container-grid">
    <div class="header">I'm the Header • Sort by Sections</div>
    <Highlights v-bind:highlights="highlights"/>
    <!-- Begin Container GTA -->
    <div class="articles-main">
      <div class="articles-main-cont">
        <!-- Begin Card -->
        <div v-for="(nyt, idx) in nyTimesArticles" :key="`nytArticle-${idx}`" :class="`article aa${idx}`">
          <img class="article-img" :src="`${nyt.multimedia[0].url}`">
          <div class="article-details">
            <h5>{{ nyt.title }}</h5>
            <p class="article-desc" @click="highlight(nyt, $event)"
              v-html="nyt.abstract.replace(/(<([^>]+)>)/ig, '')"></p>
              <b-button class="my-1" @click="highlightBtn">Highlight</b-button>
              <b-button @click="readMore(nyt.url)">Read More</b-button>
          </div>
        </div>
      <!-- End Card -->
      </div>
    </div>
    <Sidebar
      v-bind:articles="articles"
      v-bind:percentages="percentages"
      v-bind:highlights="highlights"
    />
  </div>
</b-container>
</template>

<script>
import Highlights from './Highlights'
import NewsMasthead from './NewsMasthead'
import Sidebar from './Sidebar'
import mixin from '../mixins/mixins'
export default {
  name: 'News',
  data () {
    return {
      newsApiKey: '3541fbfb60064ba4a89453bfdb61f3c9',
      weatherApiKey: '589ce3ee2bf5caac88863b07d4f33815',
      nyTimesApiKey: 'BdJBA2Un1t0ARhGPyKG5Z5KaWxgsKTe6',
      fmpApiKey: 'a7838dbefd220833441a6005a67005d0',
      fmpURLBase: 'https://financialmodelingprep.com/api/v3',
      nyTimesUrlBase: 'https://api.nytimes.com/svc/topstories/v2',
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
      ipAddress: '',
      nyTimesArticles: [],
      indexes: [],
      percentages: []
    }
  },
  components: {
    Highlights,
    NewsMasthead,
    Sidebar
  },
  mixins: [mixin],
  methods: {
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
    await Promise.all([
      fetch('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' + this.newsApiKey),
      fetch(`${this.nyTimesUrlBase}/home.json?api-key=${this.nyTimesApiKey}`),
      fetch(`${this.fmpURLBase}/quotes/index?apikey=${this.fmpApiKey}`),
      fetch('https://api.ipify.org?format=json')
    ])
      .then(async ([newsApi, nyTimes, majorsIdxs, ipApi]) => {
        const news = await newsApi.json()
        const nyt = await nyTimes.json()
        const idxs = await majorsIdxs.json()
        const ip = await ipApi.json()
        // console.log(idxs)
        return [news, nyt, idxs, ip]
      })
      .then(response => {
        this.articles = response[0].articles.filter(data =>
          data.urlToImage !== null &&
          data.description !== null &&
          data.description !== ''
        )
        this.nyTimesArticles = response[1].results.slice(0, 20)
        const majors = ['Dow Jones Industrial Average', 'NASDAQ Composite', 'S&P 500']
        this.indexes = response[2].filter(data => majors.includes(data.name))
        this.indexes.forEach((idx, i) => this.percentages.push(idx.changesPercentage))
        this.ipAddress = response[3].ip
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
  .brand-border-bottom {
    border-bottom: 1px solid #343a40;
    margin-bottom: .5rem;
    width: 100%;
  }
  .container-grid {
    font-family: "Book Antiqua", Palatino, "Palatino Linotype", "Palatino LT STD", Georgia, serif;
    display: grid;
    grid-template-columns: 10fr 5fr;
    grid-template-areas:
      "header header"
      "content sidebar";
  }

  .header {
    grid-area: header;
    border-bottom-style: double;
    padding-bottom: 2px;
  }

  .articles-main {
    display: grid;
    grid-gap: 20px;
    grid-area: content;
    margin: 1rem 0;
    padding: 10px;
  }

  .articles-main-cont {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  .article {
    background: rgba(255, 255, 255, 0.2);
    /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); */
    box-shadow: 0px 5px 3px -1px rgba(0,0,0,0.3);
    padding: 10px;
    display: grid;
    grid-template-columns: 150px 1fr;
    grid-gap: 10px;
    align-items: center;
    color: black;
    font-weight: 100;
  }
  .article-img {
    width: 100%;
    padding: 10px;
  }

  .articles-main-cont .article:nth-child(8n+1) {
    grid-column: span 1;
    grid-row: span 2;
  }
  .articles-main-cont .article:nth-child(8n+1) img{
    grid-column: span 2;
    grid-row: span 1;
  }
  .articles-main-cont .article:nth-child(8n+1) div {
    grid-column: span 2;
    grid-row: span 2;
  }
  .articles-main-cont .article:nth-child(8n+2) img,
  .articles-main-cont .article:nth-child(8n+3) img,
  .articles-main-cont .article:nth-child(8n+6) img,
  .articles-main-cont .article:nth-child(8n+8) img {
    display: none;
  }
  .articles-main-cont .article:nth-child(8n+2) div,
  .articles-main-cont .article:nth-child(8n+3) div,
  .articles-main-cont .article:nth-child(8n+6) div,
  .articles-main-cont .article:nth-child(8n+8) div {
    grid-column: span 2;;
  }
  .articles-main-cont .article:nth-child(8n+4),
  .articles-main-cont .article:nth-child(8n+5) {
    grid-column: span 2;
  }
  .articles-main-cont .article:nth-child(8n+7) {
    grid-row: span 2;
  }
  .articles-main-cont .article:nth-child(8n+7) img {
    grid-column: span 2;
    grid-row: 1;
  }
  .articles-main-cont .article:nth-child(8n+7) div {
    grid-column: span 2;
    grid-row: 2;
  }

  @media screen and (max-width: 675px) {
    .sidebar-main {
      display: none;
    }
  }
  @media screen and (max-width: 375px) {
    .articles-main-cont .article,
    .articles-main-cont .article:nth-child(8n+1),
    .articles-main-cont .article:nth-child(8n+1) img,
    .articles-main-cont .article:nth-child(8n+1) div {
      grid-column: span 2;
    }
    .articles-main-cont .article:nth-child(8n+2) img,
    .articles-main-cont .article:nth-child(8n+3) img,
    .articles-main-cont .article:nth-child(8n+4) img,
    .articles-main-cont .article:nth-child(8n+5) img,
    .articles-main-cont .article:nth-child(8n+6) img,
    .articles-main-cont .article:nth-child(8n+8) img {
      display: block;
      grid-column: span 2;
    }
    .articles-main-cont .article:nth-child(8n+4) div,
    .articles-main-cont .article:nth-child(8n+5) div {
      grid-column: span 2;
    }
    .article {
      background: rgba(255, 255, 255, 0.2);
      /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); */
      box-shadow: 0px 5px 3px -1px rgba(0,0,0,0.3);
      padding: 10px;
      display: grid;
      grid-template-columns: 150px 1fr;
      grid-gap: 10px;
      align-items: center;
      color: black;
      font-weight: 100;
    }
  }
</style>
