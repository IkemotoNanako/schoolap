<template>
<div>
    <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>
    <header>
        <h1>うちで学校！！</h1>
        <nav>
            <ul class="inner-nav">
                <li class="menu"><a href="#1">コンセプト</a></li>
                <li class="menu"><a href="#2">使い方</a></li> 
            </ul>
        </nav>
    </header>
    <div id="hamburger" @click="naviOpen" :class="{'is-active': active}">
        <span></span>
        <span></span>
        <span></span>
    </div>
    <transition name="navi">
        <nav class="menu-content" v-show="navi"> 
        <p class="menu-title">Sloth</p>
          <ul class="menu-content_inner">
            <li><a href="#1">コンセプト</a></li>
            <li><a href="#2">使い方</a></li>
          </ul>
        </nav>
    </transition>
    <h2>時間割</h2>
    <ol class="subject">
        <li v-for="(subject) in subjects" :key="subject">{{subject}}</li>
    </ol>
    <input type="text" v-model="newSubject">
    <input type="submit" value="決定" @click="addSubject">
    <input type="submit" value="削除" @click="lossSubject">
</div>
     
</template>

<script>
export default {
  data(){
    return{
        active: false,
        navi: false,
        newSubject:'',
        subjects:[]
    }
},
methods: {
    addSubject() {
        this.subjects.push(this.newSubject);
        this.newSubject = '';
    },
    lossSubject() {
        this.subjects.splice(this.newSubject);
    },
      naviOpen: function() {
      this.active = !this.active;
      this.navi = !this.navi;
    },
    }
    };
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

.content {
  background-color:rgba(255,255,255,.8);
  border-radius:.25em;
  box-shadow:0 0 .25em rgba(0,0,0,.25);
  box-sizing:border-box;
  left:50%;
  padding:10vmin;
  position:fixed;
  text-align:center;
  top:50%;
  transform:translate(-50%, -50%);
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
    padding: 0px 50px;
    display: flex;
}
.inner-nav {
    display: flex;
    justify-content: center;
    line-height: 60px;
    list-style: none;
    padding-left: 60px;
    padding-top: 15px;
}
h1 {
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    padding: 20px;
    text-shadow: 2px 2px 3px #333;
}
.menu {
    padding: 0 20px;
    cursor: pointer;
}
a {
    text-decoration: none;
    color:#fff;
    padding-left: 200px;
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

/*ハンバーガーメニュー*/


#hamburger.is-active span:nth-of-type(1) {
    top: 20px;
    transform: rotate(45deg);
}
#hamburger.is-active span:nth-of-type(2) {
    opacity: 0;
}
#hamburger.is-active span:nth-of-type(3) {
    top: 20px;
    transform: rotate(-45deg);
}
@media screen and (max-width: 768px) {
    .menu {
        display: none;
    }
    .menu-content {
        display: block;
    }
    .menu-content .menu-title {
        margin: 40px 20px;
        font-size: 2.2rem;
        color: #fff;
        text-align: left;
        font-weight: bold;
        font-style: initial;
    }
}
.menu-content {
    width: calc(100% - 80px);
    height: 100%;
    text-align: center;
    transition: .2s;
    position: fixed;
    top: 0;
    background: #fff;
    color: #333333;
    box-shadow: 80px 0 rgba(81, 82, 82, 0.3);
    z-index: 10;
}
.menu-content li a{
    color: #333333;
    margin: 15px;
    padding: 5px;
    border-bottom: 0.5px solid #333;
    display: block;
}
.memu-content li {
    width: 100%;
    text-align: left;
}

@media screen and (max-width: 768px) {
    #hamburger {
        width: 40px;
        height: 40px;
        position: absolute;
        cursor: pointer;
        z-index: 100;
        right: 20px;
        transition: .4s;
        top: 20px;
        position: fixed;
    }
    #hamburger span {
        background-color: #fff;
        position: absolute;
        left: 2px;
        display: block;
        width: 35px;
        height: 2px;
        transition: .8s;
    }
    #hamburger span:nth-of-type(1) {
        top: 10px;
    }
    #hamburger span:nth-of-type(2) {
        top: 20px;
    }
    #hamburger span:nth-of-type(3) {
        top: 30px;
    }

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
}

</style>


