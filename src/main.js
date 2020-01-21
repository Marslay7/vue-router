import Vue from "vue";
import App from "./App.vue";
import router from "./krouter";

Vue.config.productionTip = false;

// 3.把router挂载到这,为了全局使用，让所有组件都可以使用router
new Vue({
  router, // Vue.prototype.$router
  render: h => h(App)
}).$mount("#app");
