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
  color: #2c3e50;
  margin-top: 60px;
}
.highlight::selection {
  background: #375d72;
  color: white;
}
.cursor {
  cursor: url('../src/assets/highlighter.svg'), auto;
  /* background-image: url('../src/assets/highlighter.svg'); */
}
.header-margin {
  margin-top: 75px;
}
</style>
