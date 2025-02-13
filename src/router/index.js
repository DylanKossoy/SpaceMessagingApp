import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Join from '../views/Join.vue'
import SignIn from '@/views/SignIn.vue' //@ symbol starts your path at source. ../ just goes back a file
import Main from '@/views/Main.vue'
import Delete from '@/views/Delete.vue'
import Feed from '@/views/Feed.vue'
import Messages from '@/views/Messages.vue'
import sideNav from '@/components/sideNav.vue'
import Profile from '@/views/Profile.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/join',
            name: 'join',
            component: Join,
        },
        {
            path: '/signin',
            name: 'signin',
            component: SignIn,
        },
        {
            path: '/main',
            component: Main,
            children: [
                {
                    path: '',
                    components: {
                        LeftSidebar: sideNav,
                        focus: Feed,
                        RightSidebar: Messages,
                    },
                },
                {
                    path: '/main/profile',
                    components: {
                        LeftSidebar: sideNav,
                        focus: Profile,
                        RightSidebar: Messages,
                    },
                },
                {
                    path: '/main/delete',
                    components: {
                        LeftSidebar: sideNav,
                        focus: Delete,
                        RightSidebar: Messages,
                    },
                },
            ],
        },
        {
            path: '/delete',
            name: 'delete',
            component: Delete,
        },
    ],
})

export default router
