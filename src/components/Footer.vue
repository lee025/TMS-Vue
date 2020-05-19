<template>
  <b-navbar toggleable="sm" type="light" variant="light" static="bottom">
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav class="mx-auto">
        <b-nav-text class="mr-2">
          powered by:
          <b-link href="https://newsapi.org/">News API</b-link> &
          <b-link href="https://developer.nytimes.com/">NyTimes API</b-link>
        </b-nav-text>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>
