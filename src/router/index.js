import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

import index from '../views/index/main.vue';
import login from '../views/passport/login.vue';
import register from '../views/passport/register.vue';
import profile from '../views/account/main.vue';
import chatMain from '../views/chat/main.vue';
import peopleList from '../views/chat/people-list.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: '/',
    routes: [{
        name: 'index',
        path: '/',
        component: index,
        meta: {
            requireAuth: false,
        },
    }, {
        name: 'login',
        path: '/auth/login.html',
        component: login,
        meta: {
            requireAuth: false,
        },
    }, {
        name: 'register',
        path: '/auth/register.html',
        component: register,
        meta: {
            requireAuth: false,
        },
    }, {
        name: 'profile',
        path: '/account/profile.html',
        component: profile,
        meta: {
            requireAuth: true,
        },
    }, {
        name: 'chatMain',
        path: '/chatMain.html',
        component: chatMain,
        meta: {
            requireAuth: true,
        },
    }, {
        name: 'peopleList',
        path: '/peopleList.html',
        component: peopleList,
        meta: {
            requireAuth: true,
        },
    }]
});
// 路由过滤器
router.beforeEach((to, from, next) => {
    /* 必须调用 `next` */
    if (store.getters.isLogin || !to.meta.requireAuth) {
        next();
    } else {
        //如果路径不是白名单内的,而且又没有登录,就跳转登录页面
        next({
            name: 'login',
            query: { redirect: to.fullPath }
        })
    }
})
// 屏蔽路由push方法的错误信息
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router;
