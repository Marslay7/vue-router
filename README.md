# vue-router

vue-router 原理剖析及手写

#### 需求分析

> 作为一个插件存在：实现 vue-router 类和 install 方法
> 实现两个全局组件：router-view 用于显示匹配组件内容，router-link 用于跳转
> 监控 url 变化：监听 hashchange 或 popstate 事件
> 响应最新 url：创建一个响应式的属性 current，当它改变时获取对应组件并显示
