import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Join from '../views/Join.vue'
import SignIn from '@/views/SignIn.vue' //@ symbol starts your path at source. ../ just goes back a file
import Main from '@/views/Main.vue'
import Delete from '@/views/Delete.vue'
import Feed from '@/views/Feed.vue'
import Search from '@/views/Search.vue'
import sideNav from '@/components/sideNav.vue'
import Profile from '@/views/Profile.vue'
import privateMessage from '@/components/privateMessage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: { authRequired: false },
        },
        {
            path: '/join',
            name: 'join',
            component: Join,
            meta: { authRequired: false },
        },
        {
            path: '/signin',
            name: 'signin',
            component: SignIn,
            meta: { authRequired: false }
        },
        {
            path: '/main',
            component: Main,
            meta: { authRequired: true },
            children: [
                {
                    path: '',
                    components: {
                        LeftSidebar: sideNav,
                        focus: Feed,
                        RightSidebar: Search,
                    },
                    meta: { authRequired: true },
                },
                {
                    path: '/main/profile',
                    components: {
                        LeftSidebar: sideNav,
                        focus: Profile,
                        RightSidebar: Search,
                    },
                    meta: { authRequired: true },
                },
                {
                    path: '/main/delete',
                    components: {
                        LeftSidebar: sideNav,
                        focus: Delete,
                        RightSidebar: Search,
                    },
                    meta: { authRequired: true }
                },
                {
                    path: '/main/privateMessage/:userId',
                    components: {
                        LeftSidebar: sideNav,
                        focus: privateMessage,
                        RightSidebar: Search,

                    },
                    props: true,
                    meta: { authRequired: true }
                },
            ],
        },
    ],
})

export default router
