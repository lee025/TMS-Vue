<template>
  <div>
    <b-container fluid>
      <b-row>
        <div v-for="article in articles" :key="article.title" class="mx-auto">
          <b-card
            class="card grow"
            :title="article.title"
            :img-src="article.urlToImage">
            <b-card-text @click="highlight" v-html="article.description">
              <!-- {{ article.description }} -->
            </b-card-text>
            <b-button @click="highlightBtn">Highlight</b-button>
            <b-button @click="readMore(article)">Read More</b-button>
          </b-card>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'News',
  data () {
    return {
      apiKey: '3541fbfb60064ba4a89453bfdb61f3c9',
      articles: [],
      errors: [],
      highlights: []
    }
  },
  methods: {
    readMore: function (article) {
      window.open(`${article.url}`)
    },
    highlightBtn: function (e) {
      const text = e.target.previousElementSibling
      text.classList.toggle('highlight')
      text.classList.toggle('cursor')
      if (text.classList.contains('highlight')) {
        console.log(`The ${e.target.textContent} button was clicked from the ${this.currentRoute} Page! You can now hightlight text by selecting.`)
      } else {
        console.log('Highlight has been disabled.')
      }
    },
    highlight: function (e) {
      const selection = window.getSelection().toString()
      if (e.target.classList.contains('highlight') && selection) {
        this.timeStamp = new Date()
        this.highlights.push(selection)
        // console.log(this.highlights)
      }
    }
  },
  created () {
    axios.get('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' + this.apiKey)
      .then(res => {
        this.articles = res.data.articles
        console.log('data:', res.data.articles)
      })
      .catch(error => {
        this.errors.push(error)
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
    max-width: 25rem;
    margin: 2rem;
  }
  .grow {
    transition: all .1s ease-in;
  }
  .grow:hover {
    transform: scale(1.025);
  }
</style>
