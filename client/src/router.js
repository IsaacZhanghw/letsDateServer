import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Nofind from './views/404'
import Login from './views/Login'
import Home from './views/Home'
import articleList from './views/articleList'
import UsersList from './views/UsersList'

Vue.use(Router)

const router = new Router({
    base: process.env.BASE_URL,
    routes: [
        { path: '*', name: '/404', component: Nofind },
        { path: '/', redirect: '/index' },
        { path: '/login', name: 'login', component: Login },
        {
            path: '/index',
            name: 'index',
            component: Index,
            children: [
                { path: '', component: Home },
                { path: '/home', name: 'home', component: Home },
                { path: '/usersList', name: 'usersList', component: UsersList },
                { path: '/articleList', name: 'articleList', component: articleList },
            ]
        },
    ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
    const isLogin = sessionStorage.eleToken ? true : false;
    if (to.path == "/login") {
        next();
    } else {
        isLogin ? next() : next("/login");
    }
})

export default router;