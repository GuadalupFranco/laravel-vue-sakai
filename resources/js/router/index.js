import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/Layouts/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/Pages/Dashboard.vue')
                },
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('@/Pages/Dashboard.vue')
                },
                {
                    path: '/carreras',
                    name: 'carreras',
                    component: () => import('@/Pages/Dashboard.vue')
                },
                {
                    path: '/posgrado',
                    name: 'posgrado',
                    component: () => import('@/Pages/Dashboard.vue')
                },
                {
                    path: '/noticias',
                    name: 'noticias',
                    component: () => import('@/Pages/Dashboard.vue')
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
