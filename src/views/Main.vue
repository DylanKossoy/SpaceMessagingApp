<script setup>
import Header from '../components/Header.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const firstName = localStorage.getItem('firstName')

function signOut(e) {
    console.log(e)
    console.log('clicked')
    router.push({
        name: 'home',
    })
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
