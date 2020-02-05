<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <!-- 路由组件缓存 -->
    <!-- include 需要缓存的组件 -->
    <!-- exclude 不用缓存的组件 -->
    <!-- max 组件最大缓存数，超出部分会销毁一个再进入一个 -->
    <keep-alive include="home,about"
                exclude="detail"
                max="7">
      <!-- 路由出口 -->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
