<script setup>
import Header from '../components/Header.vue'
import { RouterView } from 'vue-router'
import { ref, watch } from 'vue'

const username = ref(localStorage.getItem('username') || '')

watch(username, (newUsername) => {
    localStorage.setItem('username', newUsername)
})
</script>

<template>

    <Header>
        <div class="header-profile-container">
            <img src="../../public/circle-user.png" class="userImgHeader" alt="" />
            <span class="username"> {{ username }}</span>
        </div>
    </Header>

    <main class="main-container">
        <RouterView name="LeftSidebar" class="LeftSidebar"></RouterView>
        <RouterView name="focus" class="focus-view"></RouterView>
        <RouterView name="RightSidebar" class="RightSidebar"></RouterView>
    </main>
</template>

<style scoped>
.main-container {
    display: grid;
    grid-template-columns: clamp(20vw, 25vw, 30vw) clamp(40vw, 50vw, 60vw) clamp(20vw, 25vw, 30vw);
    height: calc(100vh - 150px);
}

/* profile container */

.header-profile-container {
    display: flex;
    width: 250px;
    align-items: center;
}

/* user profile image icon on main header */
.userImgHeader {
    max-height: 40px;
}

/* username font and text */
.username {
    font-size: 20px;
    font-family: var(--font-primary);
    margin-left: 1rem;
    color: #ff7403;
}
</style>
