new Vue({
  el: '#app',
  data() {
    return {
      blocks: [],
      target: null
    }
  },
  created() {
    this.loadBlocks()
  },
  methods: {
    loadBlocks() {
      axios.get('/blocks')
        .then(response => {
          this.blocks = response.data
        })
    },
    sendKudos() {
      axios.post('/mineBlock', {
        target: this.target
      }).then(response => {
        this.loadBlocks()
      })
    }
  }
})