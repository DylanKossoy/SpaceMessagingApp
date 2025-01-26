<script setup>
import { RouterLink } from 'vue-router'
import Logo from './Logo.vue'
</script>

<template>
    <header>
        <div class="container">
            <div class="logo-container">
                <Logo />
            </div>
            <nav class="header-nav-container">
                <slot></slot>
            </nav>
        </div>
    </header>
</template>

<style scoped>
/* main container */
.container {
    display: flex;
    justify-content: space-between;
    backdrop-filter: blur(1px);
}

/* main -> two child containers */
.logo-container,
.header-nav-container {
    display: flex;
    justify-content: center;
}

::slotted(nav) {
    position: relative;
}

:deep(nav a) {
    font-family: var(--font-header-nav);
    text-decoration: none;
    color: var(--color-nav-text);
    position: relative;
    font-size: 30px;
}

:deep(nav a::before) {
    content: '';
    position: absolute;
    background-color: var(--color-primary-orange);
    bottom: -10px;
    left: -10px;
    width: 50%;
    height: 3px;
    transition: width 0.5s ease;
}

:deep(nav a:hover::before) {
    width: 120%;
}

:deep(nav a:hover) {
    color: rgb(129, 125, 118);
}
</style>
