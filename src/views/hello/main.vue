<template>
  <div class="container">
    <canvas class="clock">Your browser does not support the canvas element.</canvas>
    <p class="developing">敬请期待……</p>
    <pre>
      msg: {{msg}}
      helloMsg: {{helloMsg}}
      liveCount: {{liveCount}}
    </pre>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import rootStore from '../../store';
import moduleStore from './store';
const moduleScope = '/hello';

export default {
  name: 'hello',
  computed: {
    ...mapGetters(['msg']),
    ...mapGetters(moduleScope, ['helloMsg']),
    ...mapState(moduleScope, ['liveCount']),
  },
  methods: {
    ...mapActions(moduleScope, ['add']),
  },
  /**
   * 在渲染该组件的对应路由被 confirm 前调用
   * ！！！无需修改！！！
   * ！！！无需修改！！！
   * ！！！无需修改！！！
   */
  beforeRouteEnter(to, from, next) {
    // 载入路由对应的 module store 对象
    rootStore.registerModule(moduleScope, moduleStore);
    next(vm => {
      vm.$store.dispatch('recordModuleName', moduleScope)

      // 开发代码
      vm.add(1);
    });
  },
  
};
</script>

<!-- 添加'scoped'属性后样式仅对本组件可用  -->
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
