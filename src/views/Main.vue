<script setup>
import Header from '../components/Header.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
</template>

<style scoped></style>
