new Vue({
  el: '#app',
  data() {
    return {
      blocks: [],
      target: null,
      stats: {},
      info: {
        peers: []
      },
      error: null
    }
  },
  created() {
    this.loadInfo()
    this.loadBlocks()
  },
  methods: {
    loadInfo() {
      axios.get('/info')
        .then(response => {
          this.info = response.data
        })
    },
    loadBlocks() {
      axios.get('/blocks')
        .then(response => {
          this.blocks = response.data
          this.stats = this.blocks.reduce((rv, x) => {
            let peer = x.data.split('|')[0]
            let target = x.data.split('|')[1]

            if (!target) {
              return rv // skip genesis
            }

            if (!rv[target]) {
              rv[target] = 1
            } else {
              rv[target] += 1
            }
            return rv;
          }, {})
        })
    },
    sendKudos() {
      axios.post('/mineBlock', {
        target: this.target
      }).then(response => {
        if (!response.data) {
          this.error = `Sorry, no more cudos this month!`
        } else {
          this.error = null
          this.loadBlocks()
        }
      })
    }
  }
})