<template>
<div>

  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>
    <header>
      <p class="first-p">うちで</p>
      <p class="second-p">学校！！</p>
    </header> 
</div>
    
</template>
<script>
export default {
    methods: {
        clickHome() {
            alert('時間割づくりに進みます')
            this.$router.push('/Home')
        }
    }
}
</script>

<style scoped>
/*背景*/
.bg {
  animation:slide 3s ease-in-out infinite alternate;
  background-image: linear-gradient(60deg, rgb(235, 231, 34) 50%, rgb(10, 49, 109) 50%);
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

/*要素*/

header {
    position: relative;
}
.first-p{
    font-size: 150px;
    padding: 0px;
    margin: 0px 0px 0px 100px;
    color: #f3f3f3;
    text-shadow: 4px 4px 6px #9D9E9E;
}
.second-p{
    font-size: 150px;
    padding: 0px;
    margin: 0px 0px 0px 500px;
    color: #f3f3f3;
    text-shadow: 4px 4px 6px #9D9E9E;
}

@media screen and (max-width: 768px){
  .first-p{
      font-size: 35px;
      margin: 0px 0px 0px 0px;
  }
  .second-p{
      font-size: 35px;
      margin: 0px 0px 0px 0px;
  }
  button {
    font-size: 30px;
    top: -70px;
}
}
</style>
