<template>
  <div>
    <b-container class="mb-3">
      <b-button @click="incFontSize">Increase</b-button>
      <b-button @click="decFontSize">Decrease</b-button>
      <b-button @click="italics">Italicize</b-button>
      <b-button @click="bold">Bold</b-button>
      <p @click="highlight" v-bind:style="{ fontSize: fontSize + 'px', fontStyle: fontStyle, fontWeight: fontWeight }">
        Small batch live-edge trust fund fingerstache, ethical fanny pack farm-to-table. Asymmetrical leggings flexitarian you probably haven't heard of them. Selfies cornhole disrupt hashtag, raclette lumbersexual freegan etsy. Mumblecore knausgaard palo santo retro YOLO la croix adaptogen, kinfolk church-key dreamcatcher.
        Tacos mustache brooklyn asymmetrical four dollar toast. Sustainable whatever blue bottle williamsburg kickstarter tofu, letterpress affogato. Man braid palo santo blue bottle photo booth tacos vice, succulents XOXO. Roof party tumeric letterpress, poutine keytar stumptown brooklyn forage live-edge next level kickstarter flannel. Austin mumblecore fixie yuccie.
      </p>
      <b-button @click="highlightBtn">Highlight</b-button>
    </b-container>
    <b-container v-for="text in highlighted.slice().reverse()" :key="text.id">
      <b-card>
        <b-card-text>{{ text }}</b-card-text>
        <small>{{ timeStamp }}</small>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      highlighted: [],
      timeStamp: '',
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: 'normal'
    }
  },
  methods: {
    highlightBtn: function highlightBtn (e) {
      const text = e.target.previousElementSibling
      text.classList.toggle('highlight')
      e.target.parentElement.classList.toggle('cursor')
      if (text.classList.contains('highlight')) {
        console.log(`The ${e.target.textContent} button was clicked from the ${this.currentRoute} Page! You can now hightlight text by selecting.`)
      } else {
        console.log('Highlight has been disabled.')
      }
      // const fullText = e.target.previousElementSibling.textContent
    },
    highlight: function highlight (e) {
      const selection = window.getSelection().toString()
      if (e.target.classList.contains('highlight') && selection) {
        this.timeStamp = new Date()
        this.highlighted.push(selection)
      }
    },
    incFontSize: function incFontSize (e) {
      this.fontSize++
      console.log(`${e.target.textContent} button was clicked from the ${this.currentRoute} Page!`)
      console.log(`Current Font Size: ${this.fontSize}`)
    },
    decFontSize: function decFontSize (e) {
      this.fontSize--
      console.log(`${e.target.textContent} button was clicked from the ${this.currentRoute} Page!`)
      console.log(`Current Font Size: ${this.fontSize}`)
    },
    italics: function italics (e) {
      if (this.fontStyle === 'normal') {
        this.fontStyle = 'italic'
      } else {
        this.fontStyle = 'normal'
      }
      console.log(`${e.target.textContent} button was clicked from the ${this.currentRoute} Page!`)
    },
    bold: function bold (e) {
      if (this.fontWeight === 'normal') {
        this.fontWeight = 'bold'
      } else {
        this.fontWeight = 'normal'
      }
      console.log(`${e.target.textContent} button was clicked from the ${this.currentRoute} Page!`)
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
</style>
