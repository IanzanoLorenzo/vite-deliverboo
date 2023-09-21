import {createRouter, createWebHistory} from 'vue-router';  
import AppWelcome from './pages/AppWelcome.vue';
import AppGestional from './pages/AppGestional.vue';
import AppResturant from './pages/AppResturant.vue';

const router = createRouter({
    history : createWebHistory(),
    routes : [
        {
            path:'/',
            name:'home',
            component: AppWelcome
        },
        {
            path:'/to-gestional',
            name:'gestional',
            component: AppGestional
        },
        {
            path:'/resturants',
            name:'resturants',
            component: AppResturant
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

export {router};