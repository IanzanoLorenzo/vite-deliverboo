import { createRouter, createWebHistory } from 'vue-router';
import AppWelcome from './pages/AppWelcome.vue';
import AppMenu from './pages/AppMenu.vue';
import AppCheckOut from './pages/AppCheckOut.vue';
import AppOrder from './pages/AppOrder.vue'



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppWelcome
        },
        {
            path: '/checkout/:cart',
            name: 'checkout',
            component: AppCheckOut
        },
        {
            path: '/resturants/:slug',
            name: 'menu',
            component: AppMenu
        },
        {
            path: '/order',
            name: 'order',
            component: AppOrder
        },
        // {
        //     path: '/project/not-found',
        //     name: 'project-not-found',
        //     component: ProjectNotFound
        // },
        // {
        //     path: '/:catchAll(.*)',
        //     name: 'not-found',
        //     component: AppNotFound
        // },
    ]
});

export { router };