import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Join from '../views/Join.vue'
import SignIn from '@/views/SignIn.vue' //@ symbol starts your path at source. ../ just goes back a file

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/',
            name: 'join',
            component: Join,
        },
        {
            path: '/',
            name: 'signin',
            component: SignIn,
        },
    ],
})

export default router
