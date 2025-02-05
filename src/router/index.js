import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Join from '../views/Join.vue'
import SignIn from '@/views/SignIn.vue' //@ symbol starts your path at source. ../ just goes back a file
import Main from '@/views/Main.vue'
import Delete from '@/views/Delete.vue'
import Feed from '@/views/Feed.vue'
import UserList from '@/views/UserList.vue'
import sideNav from '@/components/sideNav.vue'

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
                        RightSidebar: UserList,
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
