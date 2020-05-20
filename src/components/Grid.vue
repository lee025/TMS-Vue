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
    <!-- Begin Sidebar -->
    <div class="sidebar-main">
      <!-- Begin Indexes -->
      <div class="majors-idxs-cont">
        <div class="idx-name-col">
          <div class="idx-name">
              <div class="pr-4"><div class="idx-border">DOW</div></div>
              <div class="pr-4"><div class="idx-border">NASDAQ</div></div>
              <div class="pr-4"><div>S&P 500</div></div>
          </div>
        </div>
        <div class="pr-4" v-bind:style="{ color: color }" >
          <div v-for="(pct, i) in percentages" :key="`pct-${i}`" class="idx-border">
            <div v-if="indexes">{{ priceStatus(pct) }}</div>
          </div>
        </div>
      </div>
      <!-- End Indexes -->
      <h2 class="sidebar-header">NewsAPI Headlines</h2>
      <!-- Begin Card -->
      <div v-for="(article, idx) in articles" :key="`article-${idx}`" class="sidebar">
        <div class="article-details">
          <h5><strong>{{ article.title }}</strong></h5>
            <p class="article-desc" @click="highlight(article, $event)"
              v-html="article.description.replace(/(<([^>]+)>)/ig, '')"></p>
              <b-button class="my-1" @click="highlightBtn">Highlight</b-button>
              <b-button @click="readMore(article.url)">Read More</b-button>
        </div>
      </div>
      <!-- End Card -->
    </div>
  <!--  -->
  </div>
</b-container>
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
      percentages: [],
      color: 'black',
      symbol: '',
      plus: '+'
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
    },
    priceStatus: function (value) {
      if (value <= 0) {
        this.color = 'red'
        this.symbol = '⇣'
        return value + this.symbol
      } else {
        this.plusMinus = '+'
        this.color = 'green'
        this.symbol = '⇡'
        return this.plusMinus + value + this.symbol
      }
    }
  },
  async created () {
    await Promise.all([
      fetch('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' + this.newsApiKey),
      fetch(`${this.nyTimesUrlBase}/home.json?api-key=${this.nyTimesApiKey}`),
      fetch(`${this.fmpURLBase}/quotes/index`),
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

  .majors-idxs-cont {
    font-family: "Book Antiqua", Palatino, "Palatino Linotype", "Palatino LT STD", Georgia, serif;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 5px 3px -1px rgba(0,0,0,0.3);
    padding: 10px;
    margin-bottom: 1rem;
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      "name change";
  }
  .idx-name {
    grid-area: name;
    grid-column: 1;
    padding-left: 1.5rem;
  }
  .idx-name-col {
    grid-area: name;
    grid-column: 1;
  }
  .idx-border:nth-child(3) {
    border-bottom: none;
  }
  .idx-border {
    border-bottom: 1px solid gray;
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

  .sidebar-header {
    border-bottom: 1px solid #343a40;
    margin-bottom: 1rem;
  }
  .sidebar-main {
    grid-area: sidebar;
    grid-gap: 20px;
    margin: 1rem 0;
    padding: 10px;
  }
  .sidebar {
    background: rgba(255, 255, 255, 0.2);
    /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); */
    box-shadow: 0px 5px 3px -1px rgba(0,0,0,0.3);
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 10px;
    align-items: center;
    padding: 10px;
    margin: 10px 0;
    color: black;
    font-weight: 100;
  }
  .sidebar .article-details {
    grid-column: span 2;
  }

  @media screen and (max-width: 675px) {
    .sidebar-main {
      display: none;
    }
  }
  @media screen and (max-width: 375px) {
    .sidebar-main {
      display: none;
    }
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
