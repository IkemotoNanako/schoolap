<template>
<div>
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>
    <div>
      <p>勉強時間</p>
      <p><input type="number" placeholder="勉強時間" v-model="study">分</p>
      <p>休憩時間</p>
      <p><input type="number" placeholder="休憩時間" v-model="rest">分</p>
    </div>
    <div id="timer">
      <div class="timer">
        <div class="time">
            {{ formatTime }}
        </div>
        <button v-on:click="start" v-if="!timerOn">Start</button>
        <button v-on:click="stop" v-if="timerOn">Stop</button>
      </div>
    </div>
    <audio src="../assets/Japanese_School_Bell02-01.mp3" autoplay controls v-if="chime"></audio>
</div>

  
</template>

<script>
export default {
  name: 'timer',
  data() {
    return {
      study: '',
      rest: '',
      min: 0,
      sec: 0,
      timerOn: false,
      timerObj: null,
      chime: false,
      number:0,
      
    }
  },
  methods: {
    count() {
      if (this.sec <= 0 && this.min >= 1) {
        this.min --;
        this.sec = 59;
      } else if (this.sec <= 0 && this.min <= 0 && this.number % 2 == 0) {
        this.chime = true
        this.number++;
        this.min = this.study;
        this.sec = 0;
      } else if (this.sec <= 0 && this.min <= 0 && this.number % 2 == 1) {
        this.chime = true;
        this.number++;
        this.min = this.rest;
        this.sec = 0;
      } else if (this.min == 0 && this.sec == 1){
        this.chime = false;
        this.sec --;
      } else {
        this.sec --;
      }
      
      
    },

    start: function() {
      let self = this;
      this.timerObj = setInterval(function() {self.count()}, 50)
      this.timerOn = true; //timerがOFFであることを状態として保持
    },

    stop: function() {
      clearInterval(this.timerObj);
      this.timerOn = false; //timerがOFFであることを状態として保持
    },
  },
  computed: {
    formatTime: function() {
      let timeStrings = [
        this.min.toString(),
        this.sec.toString()
      ].map(function(str) {
        if (str.length < 2) {
          return "0" + str
        } else {
          return str
        }
      })
      return timeStrings[0] + ":" + timeStrings[1]
    }
  }
}
</script>

<style scoped>
#timer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.time {
  font-size: 80px;
}



.bg {
  animation:slide 3s ease-in-out infinite alternate;
  background-image: linear-gradient(60deg, rgb(235, 231, 34) 50%, #09f 50%);
  bottom:0;
  left:-50%;
  opacity:.5;
  position:fixed;
  right:-50%;
  top:0;
  z-index:-1;
}

.bg2 {
  animation-direction:alternate-reverse;
  animation-duration:4s;
}

.bg3 {
  animation-duration:5s;
}

@keyframes slide {
  0% {
    transform:translateX(-25%);
  }
  100% {
    transform:translateX(25%);
  }
}

</style>