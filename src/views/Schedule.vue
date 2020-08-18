<template>
<div v-if="hoge">
    <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>
    <header>
        <h1>うちで学校！！</h1>
    </header>
    <h2>時間割</h2>
    <ol class="subject">
        <li v-for="(subject) in subjects" :key="subject">{{subject}}</li>
    </ol>
    <input type="text" v-model="newSubject">
    <input type="submit" value="決定" @click="addSubject">
    <input type="submit" value="削除" @click="delateSubject">
    <div>
      <p>勉強時間</p>
      <p><input type="number" placeholder="勉強時間" v-model="study">分</p>
      <p>休憩時間</p>
      <p><input type="number" placeholder="休憩時間" v-model="rest">分</p>
    </div>
    <div id="timer">
      <div class="timer left">
        <div class="time">
            {{ formatTime }}
        </div>
        <button v-on:click="start" v-if="!timerOn">Start</button>
        <button v-on:click="stop" v-if="timerOn">Stop</button>
      </div>
    </div>
    <audio src="../assets/Japanese_School_Bell02-01.mp3" autoplay controls v-if="chime"></audio>
</div>
<div v-else>
    <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>
    <header>
        <h1>うちで学校！！</h1>
    </header>
    <h2>時間割</h2>
    <ol class="subject">
        <li v-for="(subject) in subjects" :key="subject">{{subject}}</li>
    </ol>
    <input type="text" v-model="newSubject">
    <input type="submit" value="決定" @click="addSubject">
    <input type="submit" value="削除" @click="delateSubject">
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
  data(){
    return{
        newSubject:'',
        study: '',//記入された勉強時間
        rest: '',//記入された休憩時間
        min: 0,//初期の分
        sec: 0,//初期の秒
        timerOn: false,//タイマーのON/OFFのため
        timerObj: null,//setTimeoutを格納して、timerを止める時使う
        chime: false,//trueの時チャイム音を鳴らすものをfalseにしておく
        number:0,//勉強時間と休憩時間の切り替えのための変数
        hoge: '',//レスポンシブ対応のための変数
        subjects:[]
    }
},
methods: {
  //時間割を足す記述
    addSubject() {
        this.subjects.push(this.newSubject);
        this.newSubject = '';
    },
  //時間割を消す記述 
    delateSubject() {
        this.subjects.pop(this.newSubject);
    },
  //タイマーを動かす記述
    count() {
      if (this.sec <= 0 && this.min >= 1) {
        this.min --;
        this.sec = 59;
      } else if (this.sec <= 0 && this.min <= 0 
      && this.number % 2 == 0)//numberが偶数の時
      {
        this.chime = true//チャイムを鳴らす
        this.number++;//勉強時間と休憩時間の切り替えのための変数numberを＋１する
        this.min = this.study;//記入された勉強時間を代入
        this.sec = 0;
      } else if (this.sec <= 0 && this.min <= 0 
      && this.number % 2 == 1)//numberが奇数の時
      {
        this.chime = true;//チャイムを鳴らす
        this.number++;//勉強時間と休憩時間の切り替えのための変数numberを＋１する
        this.min = this.rest;//記入された休憩時間を代入
        this.sec = 0;
      } else if (this.min == 0 && this.sec == 1){
        this.chime = false;
        this.sec --;
      } else {
        this.sec --;
      }
    },
    start() {
      let self = this;
      this.timerObj = setInterval(function() {self.count()}, 1000)
      this.timerOn = true; //timerをONにする
    },

    stop() {
      clearInterval(this.timerObj);
      this.timerOn = false; //timerをOFFにする
    },
  },
  //分数・秒数が一桁台であれば 01という風に表示する
  computed: {
    formatTime() {
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
  },
  //レスポンシブ対応のための記述
  created() {
    if (screen.width >= 480) {
      this.hoge = true;
    } else {
      this.hoge = false;
    }
  }
}
</script>
<style scoped>
/*背景*/

.bg {
  animation:slide 3s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, #6c3 50%, #09f 50%);
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
/*header*/
header {
    margin: 0px;
    box-sizing: border-box;
    display: flex;
}
h1 {
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    padding: 20px;
    text-shadow: 2px 2px 3px #333;
    align-items: center;
    justify-content: center;
}
/*時間割*/
h2 {
    color: #fff;
    font-size: 50px;
    padding: 20px;
    text-shadow: 2px 2px 3px #333; 
}
.subject {
    color: #fff;
    text-shadow: 2px 2px 3px #333;
}
/*タイマー*/
#timer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.time {
  font-size: 80px;
}
.left {
  position: absolute;
  top: 70%;
}
p {
  font-size: 30px;
}
/*レスポンシブ対応*/
@media screen and (max-width: 768px) {
    h1 {
        font-size: 20px;
        padding: 20px 0;
        margin: 0px;
    }
    h2 {
        font-size: 17px;
    }
    p  {
        font-size: 15px;
    }
}

</style>


