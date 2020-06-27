import Vue from 'vue';
import Router from 'vue-router';

import hello from '../views/hello/main.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/demo/',
    routes: [{
        name: 'hello',
        path: '/hello',
        component: hello,
    }]
});
