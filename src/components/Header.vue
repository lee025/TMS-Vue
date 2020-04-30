<template>
  <b-navbar toggleable="sm" type="dark" variant="dark" fixed="top">
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

    <b-navbar-brand>TenMileSquare: Vue-Bootsrap</b-navbar-brand>

    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-text class="mr-2">
          <router-link to="/home">Home</router-link>
        </b-nav-text>
        <b-nav-text>
          <router-link to="/news">News</router-link>
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
