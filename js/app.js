var canvas = new Vue({
  el: '#canvas',
  data: {
    size: {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      fontsize: 0
    },
    time: {
      start: 0,
      end: 0
    },
    isShow: false,
    readyShow: false,
    readyText: 3,
    btnShow: true,
    btnText: 'Start!',
    finishTime: '',
    linkMode: { stat: false, link: -1, index: -1 },
    words: [{ text: '', link: -1 }],
    blockNum: 16,
    blockDisp: [-1],
    blockShake: [-1]   // trigger block reset
  },
  components: {
    'word-block': wordBlock
  },
  methods: {
    resize: function() {
      const ASPECT = 9/16;
      var cWidth = document.documentElement.clientWidth;
      var cHeight = document.documentElement.clientHeight;
      if (cWidth/cHeight >= ASPECT) {
        this.size.height = cHeight;
        this.size.width = cHeight * ASPECT;
        this.size.top = 0;
        this.size.left = (cWidth - this.size.width) / 2;
      } else {
        this.size.width = cWidth;
        this.size.height = cWidth / ASPECT;
        this.size.left = 0;
        this.size.top = (cHeight - this.size.height) / 2;
      }
      const SCALE = 400;
      this.size.fontsize = this.size.width / SCALE;
    },
    reset: function() {
      this.linkMode = { stat: false, link: -1, index: -1 };
      this.words = genWords(this.blockNum / 2);
      this.words = shuffle(this.words);
      var tmp = [];
      for (var i = 0; i < this.blockNum; i++) {
        tmp.push(i);
      }
      this.blockShake = tmp;
      this.blockDisp = new Array(this.blockNum).fill(true);
      this.readyShow = true;
      this.readyText = 3;
      this.btnShow = false;
      this.finishTime = '';

      let _this = this;
      setTimeout(function() {
        _this.readyText = 2;
      }, 1000);
      setTimeout(function() {
        _this.readyText = 1;
      }, 2000);
      setTimeout(function() {
        _this.isShow = true;
        _this.readyShow = false;
        _this.time.start = (new Date()).getTime();
      }, 3000);
    },
    onBlockClicked: function(info) {
      if (!this.linkMode.stat) {
        this.linkMode = Object.assign(
          { stat: true }, info);
      } else {
        if (info.link == this.linkMode.link && info.index != this.linkMode.index) {
          Vue.set(this.blockDisp, info.index, false);
          Vue.set(this.blockDisp, this.linkMode.index, false);
          this.linkMode = {
            stat: false,
            link: -1,
            index: -1
          };
        } else {
          this.blockShake = [ info.index, this.linkMode.index ];
          this.linkMode = {
            stat: false,
            link: -1,
            index: -1
          };
        }
      }
    },
    finish: function() {
      this.time.end = (new Date()).getTime();
      var sec = Math.floor((this.time.end - this.time.start) / 1000);
      var ms = Math.floor((this.time.end - this.time.start) % 1000 / 10);
      this.finishTime = sec + '.' + ms +' S';
      this.isShow = false;
      this.btnShow = true;
      this.btnText = 'Again!';
    }
  },
  created: function() {
    this.resize();
  },
  mounted: function() {
    window.onresize = this.resize;
  },
  computed: {
    computedSize: function() {
      return {
        width: this.size.width + 'px',
        height: this.size.height + 'px',
        top: this.size.top + 'px',
        left: this.size.left + 'px',
        fontSize: this.size.fontsize + 'rem'
      };
    },
    timerSize: function() {
      return {
        width: this.size.width + 'px',
        top: this.size.height * (5/8) + 'px'
      };
    },
    side: function() {
      return this.size.width;
    },
    remaining: function() {
      var sum = 0;
      for (var i=0; i<this.blockDisp.length; i++) {
        if (this.blockDisp[i]) {
          sum++;
        }
      }
      return sum;
    }
  },
  watch: {
    remaining: function() {
      if (this.remaining == 0) {
        this.finish();
      }
    }
  }
});
