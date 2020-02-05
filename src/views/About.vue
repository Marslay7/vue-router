<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: "about",
  activated() {
    console.log("激活");
  },
  deactivated() {
    console.log("释放");
  }
};
</script>

<style>
</style>

