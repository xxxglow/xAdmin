import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index'
import register from './views/Register'
import login from './views/Login'
import home from './views/Home'
import infoshow from './views/InfoShow'
import foundlist from './views/FoundList'
import eCreate from './views/Editor/create'
import eList from './views/Editor/list'
import eEdit from './views/Editor/edit'





import NoFound from './views/404'


Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: './index'

        },
        {
            path: '/index',
            name: 'index',
            component: index,
            children: [
                {
                    path: '',
                    component: home},
                {
                    path: '/home',
                    name: "home",
                    component: home},
                {
                    path: '/infoshow',
                    name: "infoshow",
                    component: infoshow},
                {
                    path: '/foundlist',
                    name: "foundlist",
                    component: foundlist},
                {
                    path: '/eCreate',
                    name: "eCreate",
                    component: eCreate
                },
                {
                    path: '/eList',
                    name: "eList",
                    component: eList
                },
                {
                    path: '/edit/:id',
                    component: eEdit,
                    name: "eEdit",
                }
            ]
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '*',
            name: '404',
            component: NoFound
        },

    ]
});

// 路由守卫

router.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false;
    if (to.path == '/login' || to.path == '/register') {
        next();
    } else {
        isLogin ? next() : next('/login');
    }
});

export default router;
