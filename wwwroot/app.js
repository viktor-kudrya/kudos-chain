new Vue({
  el: '#app',
  data() {
    return {
      blocks: [],
      target: null,
      stats: {}
    }
  },
  created() {
    this.loadBlocks()
  },
  computed: {
    statsList() {
      return Object.entries(this.stats)
    }
  },
  methods: {
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
        this.loadBlocks()
      })
    }
  }
})