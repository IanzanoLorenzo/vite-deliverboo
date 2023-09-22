import {createRouter, createWebHistory} from 'vue-router';  
import AppWelcome from './pages/AppWelcome.vue';
import AppMenu from './pages/AppMenu.vue';


const router = createRouter({
    history : createWebHistory(),
    routes : [
        {
            path:'/',
            name:'home',
            component: AppWelcome
        },
        {
            path: '/resturants/:slug',
            name: 'menu',
            component: AppMenu
        }
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

export {router};