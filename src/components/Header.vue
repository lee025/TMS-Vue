<template>
  <b-navbar toggleable="sm" type="dark" variant="dark" fixed="top">
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

    <b-navbar-brand>TenMileSquare: Vue-Bootsrap</b-navbar-brand>

    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-text class="mr-2">
          <router-link to="/home">Home</router-link>
        </b-nav-text>
        <b-nav-text class="mr-2">
          <router-link to="/news">News</router-link>
        </b-nav-text>
        <b-nav-text>
          <router-link to="/grid">Grid</router-link>
        </b-nav-text>
      </b-navbar-nav>
    </b-collapse>
    <b-button class="highlight-btn" v-if="$route.name === 'News' || $route.name === 'Grid'" size="sm" v-b-toggle.sidebar-right>View Highlights</b-button>
  </b-navbar>
</template>

<script>
export default {
}
</script>

<style scoped>
  a:hover {
    text-decoration: none;
    filter:brightness(85%)
  }
  @media screen and (max-width: 375px) {
    .highlight-btn {
      /* display: none; */
      border: none;
      background: inherit;
      margin-left: auto;
    }
  }
</style>
