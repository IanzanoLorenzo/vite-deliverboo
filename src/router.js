import {createRouter, createWebHistory} from 'vue-router';  
import AppWelcome from './pages/AppWelcome.vue';
import AppResturant from './pages/AppResturant.vue';
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
            path:'/resturants',
            name:'resturants',
            component: AppResturant
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