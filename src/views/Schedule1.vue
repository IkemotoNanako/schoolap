<template>
<div v-if="hoge">
    <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>
    <header>
        <h1>Chimy うちで学校！！</h1>
    </header>
    <h2>時間割</h2>
    <ol class="subject">
        <li v-for="(subject) in subjects" :key="subject">{{subject}}</li>
    </ol>
    <input type="text" v-model="newSubject">
    <input type="submit" value="決定" @click="addSubject">
    <input type="submit" value="削除" @click="delateSubject">
    <div class="center">
      <p>勉強時間</p>
      <p><input type="number" placeholder="勉強時間" v-model="study">分</p>
      <p>休憩時間</p>
      <p><input type="number" placeholder="休憩時間" v-model="rest">分</p>
    </div>
    <div id="timer">
      <div class="timer right">
        <div class="time">
            {{ time }}
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
        <h1>Chimy うちで学校！！</h1>
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
            {{ time }}
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
        newSubject:'',//入力された時間割
        study: '',//記入された勉強時間
        rest: '',//記入された休憩時間
        min: 0,//初期の分
        sec: 0,//初期の秒
        timerOn: false,//タイマーのON/OFFのため
        timerStrage: null,//setTimeoutを格納して、timerを止める時使う
        chime: false,//trueの時チャイム音を鳴らすものをfalseにしておく
        number:0,//勉強時間と休憩時間の切り替えのための変数
        hoge: '',//レスポンシブ対応のための変数
        subjects:[]//時間割をいれる配列
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
  // count関数はsetIntervalにより毎秒呼ばれる
    count() {
      //0秒以下 && 1分を切っていない → 分数を-1、秒を59にリセット
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
      } else if (this.min == 0 && this.sec == 1)//チャイム音のため
      {
        this.chime = false;//次のチャイム音に備えて一度falseにする
        this.sec --;//秒数を-1
      } else {
        this.sec --;//秒数を-1
      }
    },
    start() {
      let self = this;
      this.timerStrage = setInterval(function() {self.count()}, 1000)//一秒ごとにcountを呼び出している
      this.timerOn = true; //stopボタンを表示
    },

    stop() {
      clearInterval(this.timerStrage);//タイマーを止める
      this.timerOn = false; //startボタンを表示
    },
  },
  computed: {
    time() {
      let timeStrings = [
        this.min.toString(),//文字に変換
        this.sec.toString()//文字に変換
      ].map(function(str) {//分数・秒数が一桁台であれば 01という風に表示する
        if (str.length < 2) {
          return "0" + str
        } else {
          return str
        }
      })
      return timeStrings[0] + ":" + timeStrings[1]//見やすい形に
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
  background-image: linear-gradient(-60deg, rgb(235, 252, 5) 50%, #09f 50%);
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
  padding: 0 20px;
  text-shadow: 2px 2px 3px #333;
  align-items: center;
  justify-content: center;
}
/*時間割*/
h2 {
  color: #fff;
  font-size: 50px;
  padding:0 20px;
  text-shadow: 2px 2px 3px #333; 
}
.subject {
  color: #fff;
  text-shadow: 2px 2px 3px #333;
  font-size: 30px;
}
.center {
  position:absolute;
  left:35%;
  top:46%; 
}
/*タイマー*/
#timer {
  display: flex;
}
.time {
  font-size: 80px;
}
.right {
  position: absolute;
  top: 60%;
  left: 70%;
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
    .subject {
      font-size: 15px;
    }
}

</style>


