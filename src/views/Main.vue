<script setup>
import Header from '../components/Header.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const firstName = localStorage.getItem('firstName')

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
            <a @click="signOut">Sign Out</a>
        </nav>
    </Header>

    <main>
        <div class="container">
            <div class="message-container">
                <h1>Welcome {{ `${firstName}` || 'Guest' }}!</h1>
            </div>
        </div>
    </main>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.message-container {
    width: 400px;
    height: 500px;
    box-sizing: border-box;
    background-color: rgba(81, 74, 74, 0.158);
    backdrop-filter: blur(7px);
    border: 2px solid var(--color-primary-orange);
    border-radius: 20px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-primary-orange);
}
</style>
