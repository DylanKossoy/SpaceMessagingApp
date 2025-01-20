<script setup>
import Header from '../components/Header.vue'
</script>

<template>
    <Header>
        <nav>
            <RouterLink to="/join">Join</RouterLink>
            <RouterLink to="/signin">Sign In</RouterLink>
        </nav>

        <main><div>Welcome!</div></main>
    </Header>

    <main></main>
</template>

<style scoped>
:deep(a) {
    text-decoration: none;
}
</style>
