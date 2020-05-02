<template>
  <div>
    <b-sidebar id="sidebar-right" right shadow>
      <h4 class="mb-2">Your Highlights</h4>
      <section class='d-flex justify-content-around'>
        <div>
          <h3>{{ highlights.length }}</h3>
          <div>Highlight(s)</div>
        </div>
        <div>
          <h3>{{ highlights | totalBlurbs }}</h3>
          <div>Article(s)</div>
        </div>
      </section>
      <div class="px-3 py-2">
        <b-container v-for="(blurb, idx) in highlights" :key="`blurb-${idx}`">
          <b-card>
            <i @click="deleteHighlight(highlights, idx)"
              class="fas fa-eraser d-flex justify-content-end mb-2"/>
            <b-card-sub-title>
              <b-link :href="blurb.url">{{ blurb.title }}</b-link>
            </b-card-sub-title>
            <b-card-text class="my-2"><i>{{ blurb.text }}</i></b-card-text>
            <span class="ft-sm">{{ blurb.timeStamp }}</span>
          </b-card>
        </b-container>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  props: ['highlights'],
  methods: {
    readMore: function (blurb) {
      window.open(`${blurb.url}`)
    },
    deleteHighlight: function (highlights, idx) {
      highlights = highlights.splice(idx, 1)
      return highlights
    }
  },
  filters: {
    totalBlurbs: function (highlights) {
      const hash = {}
      for (let i = 0; i < highlights.length; i++) {
        let title = highlights[i].title
        if (!hash[title]) {
          hash[title] = 1
        } else {
          hash[title]++
        }
      }
      return Object.keys(hash).length
    }
  }
}
</script>

<style scoped>
  .ft-sm {
    font-size: 10px;
  }
</style>
