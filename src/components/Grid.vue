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
      <div class="article a1">
        <img class="article-img" src="https://source.unsplash.com/random/300x300?v=2">
        <div class="article-details">
          <h3>Title-Top Story</h3>
          <p class="article-desc">First/published_date/created_date/updated_date/</p>
        </div>
      </div>
      <!--  -->
      <div class="articles-main-cont">
        <div v-for="(article, idx) in articles" :key="`article-${idx}`" :class="`article aa${idx}`">
          <img class="article-img" :src="`${article.urlToImage}`">
          <div class="article-details">
            <h4>{{ article.title }}</h4>
            <p class="article-desc" @click="highlight(article, $event)"
              v-html="article.description.replace(/(<([^>]+)>)/ig, '')"></p>
              <b-button class="my-1" @click="highlightBtn">Highlight</b-button>
              <b-button @click="readMore(article.url)">Read More</b-button>
          </div>
        <!--  -->
        </div>
      </div>
    </div>
    <!-- Begin Sidebar -->
    <div class="sidebar-main">
      <h2 class="sidebar-header">I'm the Sidebar</h2>
      <div class="sidebar">
        <img class="article-img" src="https://source.unsplash.com/random/300x300?v=1">
        <div class="article-details">
          <h2>Title-SB1</h2>
          <p class="article-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum sed sint doloremque repellat, iste debitis.</p>
          <p class="article-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, excepturi!</p>
        </div>
      </div>
      <div class="sidebar">
        <img class="article-img" src="https://source.unsplash.com/random/300x300?v=2">
        <div class="article-details">
          <h2>Title-SB2</h2>
          <p class="article-desc">short.</p>
        </div>
      </div>
      <div class="sidebar">
        <img class="article-img" src="https://source.unsplash.com/random/300x300?v=2">
        <div class="article-details">
          <h2>Title-SB3</h2>
          <p class="article-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, excepturi!</p>
        </div>
      </div>
      <div class="sidebar">
        <img class="article-img" src="https://source.unsplash.com/random/300x300?v=2">
        <div class="article-details">
          <h2>Title-SB4</h2>
          <p class="article-desc">short.</p>
        </div>
      </div>
      <div class="sidebar">
        <img class="article-img" src="https://source.unsplash.com/random/300x300?v=2">
        <div class="article-details">
          <h2>Title-SB5</h2>
          <p class="article-desc">sLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum sed sint doloremque repellat, iste debitis.</p>
        </div>
      </div>
      <div class="sidebar">
        <img class="article-img" src="https://source.unsplash.com/random/300x300?v=2">
        <div class="article-details">
          <h2>Title-SB6</h2>
          <p class="article-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum sed sint doloremque repellat, iste debitis.</p>
          <p class="article-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum sed sint doloremque repellat, iste debitis.</p>
        </div>
      </div>
      <div class="sidebar">
        <img class="article-img" src="https://source.unsplash.com/random/300x300?v=2">
        <div class="article-details">
          <h2>Title-SB7</h2>
          <p class="article-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum sed sint doloremque repellat, iste debitis.</p>
        </div>
      </div>
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
    await Promise.all([
      fetch('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' + this.newsApiKey),
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
