<template>
  <div>
    <p>详情页</p>
    <p>{{$route.params.name}}</p>
  </div>
</template>

<script>
export default {
  name: "detail",
  watch: {
    $route: {
      immediate: true, // 立即执行一次
      handler() {
        if (this.$route.params.name) {
          console.log("用户" + this.$route.params.name + "详情获取");
        }
      }
    }
  }
};
</script>

<style>
</style>