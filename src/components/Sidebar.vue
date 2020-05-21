<template>
  <div class="sidebar-main">
    <!-- Begin Indexes -->
    <div class="majors-idxs-cont">
      <div class="idx-name-col">
        <div class="idx-name">
            <div class="pr-4"><div class="idx-border">DOW</div></div>
            <div class="pr-4"><div class="idx-border">NASDAQ</div></div>
            <div class="pr-4"><div>S&P 500</div></div>
        </div>
      </div>
      <div class="pr-4" v-bind:style="{ color: color }" >
        <div v-for="(pct, i) in percentages" :key="`pct-${i}`" class="idx-border">
          <div>{{ priceStatus(pct) }}</div>
        </div>
      </div>
    </div>
    <!-- End Indexes -->
    <h2 class="sidebar-header">NewsAPI Headlines</h2>
    <!-- Begin Card -->
    <div v-for="(article, idx) in articles" :key="`article-${idx}`" class="sidebar">
      <div class="article-details">
        <h5><strong>{{ article.title }}</strong></h5>
          <p class="article-desc" @click="highlight(article, $event)"
            v-html="article.description.replace(/(<([^>]+)>)/ig, '')"></p>
            <b-button class="my-1" @click="highlightBtn">Highlight</b-button>
            <b-button @click="readMore(article.url)">Read More</b-button>
      </div>
    </div>
    <!-- End Card -->
  </div>
</template>

<script>
import mixin from '../mixins/mixins'
export default {
  props: ['articles', 'percentages', 'highlights'],
  mixins: [mixin],
  data () {
    return {
      color: 'black',
      symbol: '',
      plus: '+'
    }
  },
  methods: {
    priceStatus: function (value) {
      if (value <= 0) {
        this.color = 'red'
        this.symbol = '⇣'
        return value + this.symbol
      } else {
        this.color = 'green'
        this.symbol = '⇡'
        return this.plus + value + this.symbol
      }
    }
  },
  computed: {
    currentRoute () {
      return this.$route.name
    }
  }
}
</script>

<style scoped>
  .majors-idxs-cont {
    font-family: "Book Antiqua", Palatino, "Palatino Linotype", "Palatino LT STD", Georgia, serif;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 5px 3px -1px rgba(0,0,0,0.3);
    padding: 10px;
    margin-bottom: 1rem;
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      "name change";
  }
  .idx-name {
    grid-area: name;
    grid-column: 1;
    padding-left: 1.5rem;
  }
  .idx-name-col {
    grid-area: name;
    grid-column: 1;
  }
  .idx-border:nth-child(3) {
    border-bottom: none;
  }
  .idx-border {
    border-bottom: 1px solid gray;
  }
  .sidebar-header {
    border-bottom: 1px solid #343a40;
    margin-bottom: 1rem;
  }
  .sidebar-main {
    grid-area: sidebar;
    grid-gap: 20px;
    margin: 1rem 0;
    padding: 10px;
  }
  .sidebar {
    background: rgba(255, 255, 255, 0.2);
    /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); */
    box-shadow: 0px 5px 3px -1px rgba(0,0,0,0.3);
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 10px;
    align-items: center;
    padding: 10px;
    margin: 10px 0;
    color: black;
    font-weight: 100;
  }
  .sidebar .article-details {
    grid-column: span 2;
  }

  @media screen and (max-width: 675px) {
    .sidebar-main {
      display: none;
    }
  }
  @media screen and (max-width: 375px) {
    .sidebar-main {
      display: none;
    }
  }
</style>
