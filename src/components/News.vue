<template>
  <div>
    <b-container fluid>
      <b-row>
        <div v-for="article in articles" :key="article.title" class="mx-auto">
          <b-card
            class="card grow"
            :title="article.title"
            :img-src="article.urlToImage">
            <b-card-text v-html="article.description">
              <!-- {{ article.description }} -->
            </b-card-text>
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
      errors: []
    }
  },
  methods: {
    readMore: function (article) {
      window.open(`${article.url}`)
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
