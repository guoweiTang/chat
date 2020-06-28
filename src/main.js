import Vue from 'vue'
import App from './App.vue'
import router from './router';

Vue.config.productionTip = false

// 表单验证插件
import { localize, extend, ValidationProvider, ValidationObserver } from 'vee-validate';
import { required, min, max, between, confirmed, size } from 'vee-validate/dist/rules';
import zh_CN from 'vee-validate/dist/locale/zh_CN.json';
// 注册中文提示
localize('zh_CN', zh_CN);

// 注册插件自带校验方法
extend('required', required);
extend('min', min);
extend('max', max);
extend('between', between);
extend('confirmed', confirmed);
extend('size', size);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
new Vue({
  render: createElement => createElement(App),
  router,
}).$mount('#app')
