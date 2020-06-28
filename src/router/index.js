import Vue from 'vue';
import Router from 'vue-router';

import index from '../views/index/main.vue';
import login from '../views/passport/login.vue';
import register from '../views/passport/register.vue';
import profile from '../views/account/main.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/',
    routes: [{
        name: 'index',
        path: '/',
        component: index,
    }, {
        name: 'login',
        path: '/auth/login.html',
        component: login,
    }, {
        name: 'register',
        path: '/auth/register.html',
        component: register,
    }, {
        name: 'profile',
        path: '/account/profile.html',
        component: profile,
    }]
});
