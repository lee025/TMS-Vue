<template>
  <div class="home-cont header-margin">
    <b-container class="mb-3">
      <b-button-toolbar class="mb-3">
        <b-button-group>
          <b-button @click="incFontSize" value="Font Increase"><i class="fas fa-font"/></b-button>
          <b-button @click="decFontSize" value="Font Decrease"><i class="fas fa-font fa-xs"/></b-button>
          <b-button @click="italics" value="Italicize"><i class="fas fa-italic"/></b-button>
          <b-button @click="bold" value="Bold"><i class="fas fa-bold"/></b-button>
          <b-button @click="highlightBtn" value="Highlight"><i class="fas fa-highlighter"/></b-button>
        </b-button-group>
      </b-button-toolbar>
      <p
        id="text"
        @click="highlight"
        v-bind:style="{
          fontSize: fontSize + 'px',
          fontStyle: fontStyle,
          fontWeight: fontWeight
        }">
        Small batch live-edge trust fund fingerstache, ethical fanny pack farm-to-table.
        Asymmetrical leggings flexitarian you probably haven't heard of them. Selfies
        cornhole disrupt hashtag, raclette lumber freegan etsy. Mumblecore knausgaard
        palo santo retro YOLO la croix adaptogen, kinfolk church-key dreamcatcher.
        <br/>
        Tacos mustache brooklyn asymmetrical four dollar toast. Sustainable whatever blue
        bottle williamsburg kickstarter tofu, letterpress affogato. Man braid palo santo blue
        bottle photo booth tacos vice, succulents XOXO. Roof party tumeric letterpress, poutine
        keytar stumptown brooklyn forage live-edge next level kickstarter flannel. Austin
        mumblecore fixie yuccie.
      </p>
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
// import Highlights from './Highlights'
export default {
  props: ['highlights'],
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
    log: function log (e) {
      console.log(`The '${e.currentTarget.value}' button was clicked from the ${this.currentRoute} Page!`)
    },
    highlightBtn: function highlightBtn (e) {
      const text = document.getElementById('text')
      text.classList.toggle('highlight')
      text.classList.toggle('cursor')
      if (text.classList.contains('highlight')) {
        this.log(e)
      } else {
        console.log('Highlight has been disabled.')
      }
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
      this.log(e)
      console.log(`Current Font Size: ${this.fontSize}`)
    },
    decFontSize: function decFontSize (e) {
      this.fontSize--
      this.log(e)
      console.log(`Current Font Size: ${this.fontSize}`)
    },
    italics: function italics (e) {
      if (this.fontStyle === 'normal') {
        this.fontStyle = 'italic'
      } else {
        this.fontStyle = 'normal'
      }
      this.log(e)
    },
    bold: function bold (e) {
      if (this.fontWeight === 'normal') {
        this.fontWeight = 'bold'
      } else {
        this.fontWeight = 'normal'
      }
      this.log(e)
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
  .home-cont {
    min-height: 100vh;
  }
  @media screen and (max-width: 375px) {
    .header-margin {
      margin-top: 30px;
    }
  }
</style>
