import View from "./krouter-view";
import Link from "./kouter-link";

// 全局声明vue
let Vue;

// 1.实现一个插件：挂载¥router
// 任务一：实现KVueRouter类和静态install方法
class KVueRouter {
  constructor(options) {
    this.$options = options;

    // 任务四：创建响应式的current属性
    // Vue.util.defineReactive(this, "current", "/");
    this.current = window.location.hash.slice(1) || "/";
    Vue.util.defineReactive(this, "matched", []);
    // match方法可以递归遍历路由表，获得匹配关系的数组
    this.match();

    // 任务三：监控url变化
    // bind()绑定上下文，避免onHashChange()函数中的this指向window
    window.addEventListener("hashchange", this.onHashChange.bind(this));
    window.addEventListener("load", this.onHashChange.bind(this));

    // 创建路由映射表
    // this.routeMap = {};
    // options.routes.forEach(route => {
    //   // console.log(route);
    //   // 遍历给routeMap赋值
    //   this.routeMap[route.path] = route;
    // });
  }

  // 封装函数，获取当前hash值
  onHashChange() {
    this.current = window.location.hash.slice(1);
    this.current === "" ? (this.current = "/") : this.current;

    // 路径发生变化需要重新匹配
    this.matched = [];
    this.match();
    console.log(this.current);
  }

  match(routes) {
    routes = routes || this.$options.routes;

    // 递归遍历路由表
    for (const route of routes) {
      if (route.path === "/" && this.current === "/") {
        this.matched.push(route);
        return;
      }

      // /about/info
      if (route.path !== "/" && this.current.indexOf(route.path) != -1) {
        this.matched.push(route);
        if (route.children) {
          this.match(route.children);
        }
        return;
      }
    }
  }
}

// vue执行插件方法的时候会传递一个vue的构造函数
KVueRouter.install = function(_Vue) {
  // 保存构造函数，在KVuerouter里面使用
  Vue = _Vue;
  // 挂载$router
  // 获取根实例中的router选项
  Vue.mixin({
    // 这里的beforeCreate会和其他组件的beforeCreate融合
    beforeCreate() {
      // console.log(this.$options);
      // 如果this.$options.router存在，说明为根实例，确保在根实例下挂载$router，这样$router就可以全局使用了
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    }
  });

  // 任务二：实现全局组件router-link和router-view
  // 全局注册组件：Vue.component('组件名',{配置对象})
  // 这里配置对象不能用template:'<a></a>'，因为当前环境为runtime-only版本(纯运行环境)没有编译器
  Vue.component("router-link", Link);
  Vue.component("router-view", View);
};

export default KVueRouter;
