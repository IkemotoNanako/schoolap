<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">漢字</router-link> |
      <router-link to="/schedule2">ひらがな・カタカナ</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}
</style>


