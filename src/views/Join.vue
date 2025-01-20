<script setup>
import { RouterLink } from 'vue-router'
import Header from '../components/Header.vue'
</script>

<template>
    <Header>
        <nav>
            <RouterLink to="/home">Home</RouterLink>
        </nav>
    </Header>

    <main>
        <div class="container"></div>
    </main>
</template>

<style scoped></style>
