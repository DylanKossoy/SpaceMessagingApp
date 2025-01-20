<script setup>
import { RouterLink } from 'vue-router'
import Logo from './Logo.vue'
</script>

<template>
    <header>
        <div class="container">
            <Logo />
            <slot></slot>
        </div>
    </header>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
}
</style>
