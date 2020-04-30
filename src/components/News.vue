<template>
  <div>
    Test News Page
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
  created () {
    axios.get('http://newsapi.org/v2/everything?domains=wsj.com&apiKey=' + this.apiKey)
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
</style>
