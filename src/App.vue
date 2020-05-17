<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #f1f1f1;
  color: #2c3e50;
  padding-top: 4rem;
}
.highlight::selection {
  background: #375d72;
  color: white;
}
.cursor {
  cursor: url('../src/assets/highlighter.svg') 5 15, auto;
  /* background-image: url('../src/assets/highlighter.svg'); */
}
.header-margin {
  margin-top: 75px;
}
@media screen and (max-width: 375px) {
  .header-margin {
    margin-top: 100px;
  }
}
</style>
