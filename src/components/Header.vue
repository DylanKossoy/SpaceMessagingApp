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

:deep(a) {
    text-decoration: none;
    color: var(--color-nav);
    cursor: pointer;
    padding-bottom: 1rem;
    border-bottom: 4px solid transparent;
    transition: border-bottom 0.5s ease;
}

:deep(a):hover {
    border-bottom: 4px solid var(--color-nav);
}
</style>
