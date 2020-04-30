<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header
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
</style>
