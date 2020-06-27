<template>
  <div class="container">
    <canvas class="clock">Your browser does not support the canvas element.</canvas>
    <p class="developing">敬请期待……</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import rootStore from "../../store";
import moduleStore from "./store";
import * as consts from "./constants";

export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  computed: {
    ...mapState(consts.MODULE_NAME, ["msg"])
  },
  methods: {
    ...mapActions(consts.MODULE_NAME, ["sayHello"]),
    /**
     * 记录当前路由对应的 module name, 并卸载上一路由对应的 module store
     *
     * !!!请勿修改!!!
     * !!!请勿修改!!!
     * !!!请勿修改!!!
     */
    ...mapActions(["recordModuleName"])
  },
  /**
   * 无需修改，载入路由对应的 module store 对象
   *
   * !!!请勿修改!!!
   * !!!请勿修改!!!
   * !!!请勿修改!!!
   */
  beforeRouteEnter(to, from, next) {
    rootStore.registerModule(consts.MODULE_NAME, moduleStore);

    next(vm => {
      vm.recordModuleName(consts.MODULE_NAME);
    });
  },
};
</script>

<!-- 添加"scoped"属性后样式仅对本组件可用  -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
