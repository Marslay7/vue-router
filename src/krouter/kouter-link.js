export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  render(h) {
    // 最终渲染：<a href="#/about">abc</a>
    // 代码使用：<router-link to="/about">
    // h函数用法：h(tag,data,children)
    // render()函数返回一个a标签，通过attrs设置href属性；通过props传递to指向；通过$slots.default获取默认值
    // console.log(this.$slots);
    return h(
      "a",
      { attrs: { href: "#" + this.to }, class: "router-link" },
      this.$slots.default
    );
    // jsx写法,不用接收render()里的h函数，不推荐使用，脱离当前运行环境无法编译
    // return <a href={"#" + this.to}>{this.$slots.default}</a>;
  }
};
