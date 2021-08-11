import { AppHomeView } from '@/views/home';
import { AppLoginView } from '@/views/login';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import firebase from 'firebase';

Vue.use(VueRouter);

export const RouterFactory = (auth: firebase.auth.Auth): VueRouter => {
    const routes: Array<RouteConfig> = [
        {
            name: 'home',
            path: '/home',
            component: AppHomeView,
            meta: {
                requireAuth: true
            }
        },
        {
            name: 'login',
            path: '/login',
            component: AppLoginView,
            meta: {
                requireAuth: false
            }
        },
        {
            path: '*',
            redirect: '/home'
        }
    ];

    const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    });

    router.beforeEach(async (to, _, next) => {
        if (to.meta?.requireAuth && !auth.currentUser) {
            next({ name: 'login' });
        } else {
            next();
        }
    });

    return router;
};
