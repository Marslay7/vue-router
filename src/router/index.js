import Vue from "vue";
import VueRouter from "vue-router";

// 1.应用插件
Vue.use(VueRouter);

// 路由配置
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    children: [
      {
        path: "/home/:name",
        name: "homeDetail",
        component: () => import("../views/Detail.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/detail/:name",
    name: "detail",
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/Detail.vue")
  }
];

// 2.创建实例
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 全局守卫
// router.beforeEach((to, from, next) => {
//   /**
//    * 判断路由是否需要守卫
//    * meta数据
//    * to 去哪
//    * from 来自于哪
//    * next 放行函数
//    */
//   if (to.meta.auth) {
//     // 是否登录
//     if (window.isLogin) {
//       // 如果登录则允许访问
//       next();
//     } else {
//       // 如果未登录，跳转login页面，设置redirect，当登录成功后，重定向到to页面
//       next("/login?redirect=" + to.fullPath);
//     }
//   } else {
//     // 如果不需要守卫，直接放行
//     next();
//   }
// });

// 动态路由
router.beforeEach((to, from, next) => {
  /**
   * 判断逻辑
   * 优先判断用户是否登录
   */
  if (window.isLogin) {
    // 如果用户已登录，回首页；如果未登录，放行
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    // 如果用户未登录，并且要去登录页，放行；想去其他页面，跳转登录页
    if (to.path === "/login") {
      next();
    } else {
      next("/login?redirect=" + to.fullPath);
    }
  }
});

export default router;
