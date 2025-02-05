<script setup>
import Header from '../components/Header.vue'
import { useRouter } from 'vue-router'
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
        <nav class="servicesHeader flex">
            <div
                tabindex="0"
                class="hamburger-menu flex"
                @click="toggleSidebar"
                v-bind:class="{ active: sidebarToggle }"
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    </Header>

    <main>
        <div class="container"></div>
    </main>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    border: 1px solid white;
}
</style>
