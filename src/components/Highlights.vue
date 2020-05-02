<template>
  <div>
    <b-sidebar id="sidebar-right" right shadow>
      <h4 class="mb-2">Your Highlights</h4>
      <section class='d-flex justify-content-around'>
        <div>
          <h3 class="mb-0">{{ highlights.length }}</h3>
          <small>HIGHLIGHT(S)</small>
        </div>
        <div>
          <h3 class="mb-0">{{ highlights | totalBlurbs }}</h3>
          <small>ARTICLE(S)</small>
        </div>
      </section>
      <div class="px-3 py-2">
        <b-container v-for="(blurb, idx) in highlights" :key="`blurb-${idx}`">
          <b-card>
            <i @click="deleteHighlight(highlights, idx)"
              class="fas fa-eraser d-flex justify-content-end mb-2"/>
            <b-card-sub-title>
              <b-link @click="readMore(blurb.url)">{{ blurb.title }}</b-link>
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
import mixin from '../mixins/mixins'
export default {
  props: ['highlights'],
  mixins: [mixin],
  methods: {
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
  a {
    color:#343a40;
    text-decoration: none;
    filter: brightness(150%);
  }
  a:hover {
    filter:brightness(5%);
  }
  .fa-eraser {
    cursor: pointer;
    transition: all .2s ease-in-out;
  }
  .fa-eraser:hover {
    filter: invert(75%) brightness(85%);
    transform: scale(.98);
  }
  /* .fa-eraser {
    cursor: pointer;
    color:#343a40;
    background: white;
    margin-left: 85%;
    width: fit-content;
    padding: 5px;
    border-radius: 5px;
    display: inline-block;
    transition: all 0.4s ease 0s;
  }
  .fa-eraser:hover {
    background:#6c757d;
    color: #f8f9fa;
    letter-spacing: 1px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.4s ease 0s;
  } */

</style>
