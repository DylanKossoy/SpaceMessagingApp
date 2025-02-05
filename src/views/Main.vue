<script setup>
import Header from '../components/Header.vue'
import { useRouter, RouterView } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const firstName = localStorage.getItem('firstName')

const sidebarToggle = ref(false)

function toggleSidebar() {
    sidebarToggle.value = !sidebarToggle.value
}

async function signOut(event) {
    event.preventDefault()

    const token = localStorage.getItem('token')

    const url = 'https://hap-app-api.azurewebsites.net/user/logout'

    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await fetch(url, options)

    if (response.ok) {
        if (response.status === 200) {
            localStorage.removeItem('token')
            localStorage.removeItem('firstName')

            router.push({
                name: 'home',
            })
        }
    } else {
        console.log('HTTP-Error: ' + response.status)
    }
}
</script>

<template>
    <Header>
        <nav>
            <a @click="signOut" class="flex">Sign Out</a>
        </nav>
    </Header>

    <main>

        <RouterView name="LeftSideBar" class="LeftSideBar gridItem"></RouterView>

    </main>
</template>

<style scoped>

</style>
