<template>
  <div>
    <h1>注册页面</h1>
    <button @click="login"
            v-if="!isLogin">登录</button>
    <button @click="logout"
            v-else>注销</button>
  </div>
</template>

<script>
export default {
  name: "login",
  methods: {
    login() {
      window.isLogin = true;

      /**
       * 动态添加路由
       * 使用router.addRoutes后生成的动态路由;需要考虑到通配符404页面
       * 做权限管理时，404路由通常放在权限路由最后面，确保优先匹配到需要的路由
       */

      this.$router.addRoutes([
        {
          path: "/about",
          name: "about",
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/About")
        },
        {
          path: "/*/",
          name: "404",
          component: () =>
            import(/* webpackChunkName: "error" */ "../views/404.vue")
        }
      ]);
      // 通过query查询参数获取重定向的地址，并跳转
      const redirect = this.$route.query.redirect || "/";
      this.$router.push(redirect);
    },
    logout() {
      window.isLogin = false;
      this.$router.push("/");
    }
  },
  computed: {
    isLogin() {
      return window.isLogin;
    }
  }
};
</script>

<style>
</style>