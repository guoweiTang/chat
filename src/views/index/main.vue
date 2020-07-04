<template>
  <div class="entry">
    <canvas class="clock">Your browser does not support the canvas element.</canvas>
    <p class="developing">敬请期待……</p>
    <pre>
      isLogin: {{isLogin}}
      helloMsg: {{helloMsg}}
      liveCount: {{liveCount}}
    </pre>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import rootStore from '../../store';
import moduleStore from './store';
const moduleScope = 'index';
let timer = null;

export default {
  name: 'index',
  computed: {
    ...mapState(moduleScope, ['liveCount', 'canvasWidth']),
    ...mapGetters(['isLogin']),
    ...mapGetters(moduleScope, ['helloMsg']),
  },
  methods: {
    ...mapActions(moduleScope, ['add'])
  },
  /**
   * 在渲染该组件的对应路由被 confirm 前调用
   * ！！！无需修改！！！
   * ！！！无需修改！！！
   * ！！！无需修改！！！
   */
  beforeRouteEnter(to, from, next) {
    // 载入路由对应的 module store 对象
    // 由于整个项目仅有这个路由注册了模块store，防止模块重复注册导致错误，以下代码判断方法纯属偏方，不建议正式开发使用
    let moduleName = Object.keys(rootStore._modules.root._children);
    if (moduleName.indexOf(moduleScope) === -1) {
      rootStore.registerModule(moduleScope, moduleStore);
    }
    next(vm => {
      if (moduleName.indexOf(moduleScope) === -1) {
        vm.$store.dispatch('recordModuleName', moduleScope);
      }
      // 开发代码
      vm.add(1);
      let lock = vm.$el.getElementsByClassName('clock')[0];
      let ctx = lock.getContext('2d');
      let canvasW = vm.canvasWidth;
      lock.width = lock.height = canvasW;
      setDirective(ctx, canvasW / 2);
    });
  },
};
// 绘图
function setDirective(ctx, w) {
  ctx.clearRect(0, 0, 2 * w, 2 * w);
  let t = new Date();
  // 表盘
  let lineWidth = 6;
  let r = w - lineWidth;
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.arc(w, w, r, 0, 2 * Math.PI);
  let grd = ctx.createLinearGradient(w, 0, w, 2 * w);
  grd.addColorStop(0, '#d2e5ed');
  grd.addColorStop(1, '#767574');
  ctx.strokeStyle = grd;
  ctx.stroke();

  // 时间刻度
  ctx.lineWidth = lineWidth / 2;
  for (let i = 1; i <= 12; i++) {
    ctx.beginPath();
    ctx.moveTo(w, w);
    ctx.lineTo(
      w + r * Math.sin((Math.PI / 6) * i),
      w - r * Math.cos((Math.PI / 6) * i)
    );
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(w, w, r - r / 5, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.fill();

  // 时针
  let timeArr = t.toLocaleTimeString().match(/\d+/g);
  let scaleH =
    (Number(timeArr[0]) * 3600 + Number(timeArr[1] * 60) + Number(timeArr[2])) /
    (12 * 3600);
  ctx.beginPath();
  ctx.moveTo(w, w);
  ctx.lineTo(
    w + (r - r / 2) * Math.sin(scaleH * 2 * Math.PI),
    w - (r - r / 2) * Math.cos(scaleH * 2 * Math.PI)
  );
  ctx.lineCap = 'round';
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#ff8d00';
  ctx.stroke();

  // 分针
  ctx.beginPath();
  ctx.moveTo(w, w);
  ctx.lineTo(
    w + (r - r / 3) * Math.sin((t.getMinutes() / 60) * 2 * Math.PI),
    w - (r - r / 3) * Math.cos((t.getMinutes() / 60) * 2 * Math.PI)
  );
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#00b38a';
  ctx.stroke();

  // 秒针
  ctx.beginPath();
  ctx.moveTo(w, w);
  ctx.lineTo(
    w + (r - r / 4) * Math.sin((t.getSeconds() / 60) * 2 * Math.PI),
    w - (r - r / 4) * Math.cos((t.getSeconds() / 60) * 2 * Math.PI)
  );
  ctx.lineCap = 'round';
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#e1251b';
  ctx.stroke();

  // 表盘中心
  ctx.beginPath();
  ctx.arc(w, w, r / 15, 0, 2 * Math.PI);
  ctx.fillStyle = '#000';
  ctx.fill();

  // 回调自身
  clearTimeout(timer);
  timer = setTimeout(setDirective, 1000, ctx, w);
}
</script>

<!-- 添加'scoped'属性后样式仅对本组件可用  -->
<style scoped>
.clock {
  display: block;
  margin: 0 auto;
}
p.developing {
  margin-top: 18px;
  text-align: center;
  font-size: 18px;
  color: #666;
  font-weight: bold;
}
</style>
