export default {
  methods: {
    testMixin (value) {
      alert(value)
    },
    readMore (value) {
      window.open(`${value}`)
    }
  }
}
