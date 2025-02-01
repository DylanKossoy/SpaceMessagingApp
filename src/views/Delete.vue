<script setup>
import Header from '@/components/Header.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
    <Header>
        <nav>
            <RouterLink to="/main">Back</RouterLink>
        </nav>
    </Header>

    <main>
        <div class="container"></div>
    </main>
</template>

<style scoped>
.container {
    height: 600px;
    margin-top: 2rem;
    border: 2px solid white;
}

img {
    max-width: 40px;
}
</style>
