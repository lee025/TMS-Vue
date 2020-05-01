<template>
  <div>
    <b-button v-b-toggle.sidebar-right>View Highlights</b-button>
    <b-sidebar id="sidebar-right" title="Highlights" right shadow>
      <div class="px-3 py-2">
        <b-container v-for="blurb in highlights" :key="blurb.id">
          <b-card>
            <b-card-text>{{ blurb.text }}</b-card-text>
            <small>{{ blurb.timeStamp }}</small>
          </b-card>
        </b-container>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  props: ['highlights']
}
</script>

<style scoped>

</style>
