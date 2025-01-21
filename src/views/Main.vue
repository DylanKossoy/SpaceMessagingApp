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
    width: 100%;
    height: 100%;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
}

.message-container {
    width: 400px;
    height: 500px;
    background: rgba(137, 139, 144, 0.036);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 30px;
    border: 2px solid var(--color-form-border);
    color: var(--color-form-border);
}
</style>
