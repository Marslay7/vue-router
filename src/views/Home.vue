<template>
  <div class="home">
    <img alt="Vue logo"
         src="../assets/logo.png">
    <p>首页</p>
    <div v-for="item in name"
         :key="item">
      <!-- 通过path跳转 -->
      <router-link :to="`/home/${item}`">{{item}}</router-link>
      <!-- 通过name跳转，如果有动态参数，可以通过params传递 -->
      <!-- <router-link :to="{name: 'homeDetail',params:{name:item}}">{{item}}</router-link> -->
    </div>
    <!-- 嵌套内容的出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      name: ["Lay", "Summer"]
    };
  }
};
</script>
