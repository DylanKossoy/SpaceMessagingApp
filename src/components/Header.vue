<script setup>
import { RouterLink } from 'vue-router'
import Logo from './Logo.vue'
import { ref } from 'vue'
</script>

<template>
    <header>
        <div class="container">
            <div class="logo-container flex">
                <Logo />
            </div>
            <nav class="header-nav-container flex">
                <slot></slot>
            </nav>
        </div>
    </header>
</template>

<style scoped>
/* main container */
.container {
    display: flex;
    height: 150px;
    justify-content: space-between;
    backdrop-filter: blur(11px);
    overflow: hidden;
    background-color: rgba(14, 13, 13, 0.093);
}

/* whenever join or sign in */

/* main -> two child containers */
.logo-container,
.header-nav-container {
    display: flex;
    justify-content: center;
}

/* sizing header nav container */
.header-nav-container {
    width: 400px;
}

.logo-container {
    margin-left: 4rem;
    margin-top: 2rem;
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
    margin-right: 2rem;
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

:slotted(button) {
    background-color: black;
}

:deep(nav a:hover) {
    color: rgb(129, 125, 118);
}

/* profile container that holds profile image */

/* media queries */

@media (max-width: 1440px) {
    .container {
        height: 150px;
    }
}

@media (max-width: 600px) {
    :deep(nav) {
        justify-content: center;
    }

    :deep(nav a) {
        font-size: 20px;
    }
}
</style>
