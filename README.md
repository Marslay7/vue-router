### vue-router 基础

> 介绍：vue.js 官方路由管理器。

> 安装：

- 库安装：npm install vue-router / yarn add vue-router
- 项目安装：vue add router

> 基础：

- 起步：

  - 在 main.js 中挂载 router，以便全局使用

    ```js
    import Vue from "vue";
    import App from "./App.vue";
    import router from "./router";

    Vue.config.productionTip = false;

    // 3.把router挂载到这,为了全局使用，让所有组件都可以使用router
    new Vue({
      router, // Vue.prototype.$router
      render: h => h(App)
    }).$mount("#app");
    ```

  - 在 router/index.js 中配置路由选项

    ```js
    import Vue from "vue";
    import VueRouter from "vue-router";
    import Home from "../views/Home.vue";

    // 1.应用插件
    Vue.use(VueRouter);

    // 路由配置
    const routes = [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      }
    ];

    // 2.创建实例
    const router = new VueRouter({
      mode: "history",
      base: process.env.BASE_URL,
      routes
    });

    export default router;
    ```

  - 在 App.vue 中设置导航、路由出口

    ```js
    <template>
      <div id="app">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
        <!-- 路由出口 -->
        <router-view />
      </div>
    </template>
    ```

- 动态路由匹配：

  - 概念：把某种模式匹配到的所有路由，全都映射到同一个组件。

  - 使用场景：有一个 Detail 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。

    ```js
    // src/router/index.js
    // 配置动态路由
    {
        path: "/detail/:name",
        name: "detail",
        component: () =>
          import(/* webpackChunkName: "detail" */ "../views/Detail.vue")
      }
    ```

    ```js
    // src/views/Home.vue
    // 动态路由跳转至相应的用户页面
    <div v-for="item in name"
             :key="item">
          <router-link :to="`/detail/${item}`">{{item}}</router-link>
    </div>
    ```

    ```js
    // src/views/Detail.vue
    // 通过$route.params接收动态路由参数
    <div>
      <p>详情页</p>
    <p>{{$route.params.name}}</p>
    </div>
    ```

  - 通配符：

    - 使用场景：适合做 404 页面路由

      ```js
      // src/router/index.js
      // /*/会匹配所有路径
      {
          path: "/*/",
          name: "404",
          component: () => import(/* webpackChunkName: "error" */ "../views/404.vue")
        }
      ```

- 嵌套路由：

  - 概念：实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件。

  - 使用场景：首页点击用户名显示详情。

    ```js
    // src/router/index.js
    // children为子路由配置,动态传值
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
    }
    ```

    ```html
    // src/views/Home.vue
    <template>
      <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <p>首页</p>
        <div v-for="item in name" :key="item">
          <!-- 通过path跳转 -->
          <router-link :to="`/home/${item}`">{{item}}</router-link>
          <!-- 通过name跳转，如果有动态参数，可以通过params传递 -->
          <!-- <router-link :to="{name: 'homeDetail',params:{name:item}}">{{item}}</router-link> -->
        </div>
        <!-- 嵌套内容的出口 -->
        <router-view></router-view>
      </div>
    </template>
    ```

  - 组件复用时的注意事项：

    - 使用场景：在上面案例中，如果需要在点击不同用户的时候加载不同的数据(向后台请求不同客户的详情数据)，则需要进行如下操作：

      ```js
      // src/views/Detail.vue
      // 当组件第一次创建的时候会执行created钩子，之后的每次切换可以通过watch监听当前路由的$route
      <script>
      export default {
        name: "detail",
        watch: {
          $route() {
            // 当router参数有改变执行
            console.log("发送请求");
          }
        },
        created() {
          // 第一次组件创建执行
          console.log("发送请求");
        }
      };
      </script>
      ```

    - 优化方案：

      ```js
      <script>
        export default {
          name: "detail",
          watch: {
            $route: {
              immediate: true, // 立即执行一次
              handler() {
                console.log("用户" + this.$route.params.name + "详情获取");
              }
            }
          }
        };
      </script>
      ```

- 编程式导航：

  - 概念：借助 router 的实例方法， 实现编程式导航

  - api：router.push(location,onComplete,onAbort)

    - onComplete：路由完成的回调函数
    - onAbort：路由取消的回调函数

  - 使用方式：

    ```js
    // 字符串
    router.push("home");

    // 对象
    router.push({ path: "home" });

    // 通过name命名的路由,params负责传值
    router.push({ name: "home", params: { name: c.name } });

    // 带查询参数
    router.push({ name: "register", query: { plan: "private" } });
    ```

- 命名路由：

  - 概念：通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称 name。

  - 使用方式：

    ```js
    // router-link
    <router-link :to="{name: 'homeDetail',params:{name:item}}">{{item}}</router-link>
    // router.push
    router.push({name:"home",params:{name: c.name}});
    ```

> 进阶：

- 路由守卫

  - 概念：即导航守卫，vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。

  - 使用场景：比如用户没有权限访问该路由。

    - 全局路由：

    ```js
    // src/router/index.js
    {
        path: "/about",
        name: "about",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: {
          auth: true// 设置该路由需要授权
        }
    }

    // 全局守卫
    router.beforeEach((to, from, next) => {
      /**
       * 判断路由是否需要守卫
       * meta数据
       * to 去哪
       * from 来自于哪
       * next 放行函数
       */
      if (to.meta.auth) {
        // 是否登录
        if (window.isLogin) {
          // 如果登录则允许访问
          next();
        } else {
          // 如果未登录，跳转login页面，设置redirect，当登录成功后，重定向到to页面
          next("/login?redirect=" + to.fullPath);
        }
      } else {
        // 如果不需要守卫，直接放行
        next();
      }
    });
    ```

    ```html+js
    // src/views/Login.vue
    <template>
      <div>
        <h1>注册页面</h1>
        <button @click="login" v-if="!isLogin">登录</button>
        <button @click="logout" v-else>注销</button>
      </div>
    </template>

    <script>
      export default {
        name: "login",
        methods: {
          login() {
            window.isLogin = true;
            // 通过query查询参数获取重定向的地址，并跳转
            this.$router.push(this.$route.query.redirect);
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
    ```

    - 路由独享的守卫：

      ```js
      // src/router/index.js
      // 直接在配置路由里设置
      {
          path: "/about",
          name: "about",
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
          meta: {
            auth: true // 设置该路由需要授权
          },
          beforeEnter(to, from, next) {
            if (window.isLogin) {
              next();
            } else {
              next("/login?redirect=" + to.fullPath);
            }
          }
      }
      ```

    - 组件内守卫：

      - beforeRouteEnter
      - beforeRouteUpdate
      - beforeRouteLeave

      ```js
      // src/views/About.vue
      <script>
      export default {
        name: "about",
        beforeRouteEnter(to, from, next) {
          if (window.isLogin) {
            next();
          } else {
            next("/login?redirect=" + to.fullPath);
          }
        }
      };
      </script>
      ```

* 数据获取

  - 路由激活时，如果需要获取服务器数据，有两个时机：

    - 路由导航前

      ```js
      // 组件未渲染，通过给next传递回调访问组件实例
      beforeRouteEnter (to, from, next) {
      	getPost(to.params.id, post => {
      		next(vm => vm.setData(post))
      	})
      },
      // 组件已渲染，可以访问this直接赋值
      beforeRouteUpdate (to, from, next) {
      	this.post = null
      	getPost(to.params.id, post => {
      		this.setData(post)
      		next()
      	})
      }
      ```

    - 路由导航后

      ```js
      methods: {
        fetchData() {
          ...
        }
      }
      created () {
      	this.fetchData()
      },
      watch: {
      	'$route': 'fetchData'
      }
      ```

- 动态路由(加载)

  - 概念：通过 router.addRoutes(routes)方式动态添加路由

  - 使用场景：如果用户没有权限访问该路由，则不添加该路由。

    ```js
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
    ```

* 路由组件缓存

  - 概念：在组件切换过程中将状态保留在内存中，防止重复渲染 dom;

    ​ 缓存不活动的组件实例，而不销毁它们。

  - 用法：

    ```html
    <!-- 路由组件缓存 -->
    <!-- include 需要缓存的组件 -->
    <!-- exclude 不用缓存的组件 -->
    <!-- max 组件最大缓存数，超出部分会销毁一个再进入一个 -->
    <keep-alive include="home,about" exclude="detail" max="7">
      <!-- 路由出口 -->
      <router-view></router-view>
    </keep-alive>
    ```

    - 使用 include 或 exclude 时要给组件设置 name

  - 生命周期：

    - activated 激活组件

    - deactivated 释放组件

* 路由懒加载

  - 概念：路由组件的懒加载能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
  - 用法：component: () => import("../views/Detail.vue")
  - 把组件按组分块：component: () => import(/_ webpackChunkName: "login" _/ "../views/Login.vue")
