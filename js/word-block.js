var wordBlock = Vue.component('word-block', {
  data: function() {
    return {
      num: 4,
      space: 10,
      margin: 15,
      radius: 5,
      dfc: '#70a1ff',
      hlc: '#ff7f50',
      bgc: ''
    };
  },
  props: ['word', 'side', 'index', 'shake', 'disp'],
  template: `
    <div class="word-block" :style="computedSize" v-tap="{ methods: clickHandler }">
      {{ word.text }}
    </div>
  `,
  computed: {
    computedSize: function() {
      let width = (this.side - (this.num-1)*this.space - 2*this.margin) / this.num;
      let row = Math.floor(this.index/this.num), column = this.index%this.num;
      let top = this.margin + row*width + (row>0 ? row*this.space : 0);
      let left = this.margin + column*width + (column>0 ? column*this.space : 0);
      return {
        width: width + 'px',
        height: width + 'px',
        top: top + 'px',
        left: left + 'px',
        borderRadius: this.radius + 'px',
        backgroundColor: this.bgc,
        display: this.disp[this.index] ? '' : 'none'
      };
    }
  },
  watch: {
    shake: function() {
      if (this.shake.indexOf(this.index) != -1) {
        this.bgc = this.dfc;
      }
    }
  },
  methods: {
    clickHandler: function(event) {
      this.highlight();
      this.$emit('block-clicked', { link: this.word.link, index: this.index });
    },
    highlight: function() {
      this.bgc = this.hlc;
    }
  },
  created: function() {
    this.bgc = this.dfc;
  }
});
