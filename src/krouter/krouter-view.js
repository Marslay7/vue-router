export default {
  render(h) {
    // console.log(this.$router);
    // 获取path对应的component
    // 解构赋值
    const { routeMap, current } = this.$router;
    // 获取当前路由的component,如果没有返回null
    let component = routeMap[current].component || null;
    return h(component);
  }
};
