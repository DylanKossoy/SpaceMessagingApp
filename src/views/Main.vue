<script setup>
import Header from '../components/Header.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'






const username = localStorage.getItem('username');
</script>

<template>
    <Header>

        <div class="header-profile-container" >
                <img src="../../public/circle-user.png" class="userImgHeader" alt="">
                <span class="username"> {{ username }}</span>
            </div>
    </Header>

    <main class="flex">
        <RouterView name="LeftSidebar" class="LeftSidebar size"></RouterView>
        <RouterView name="focus" class="focus-view size"></RouterView>
        <RouterView name="RightSidebar" class="RightSidebar size"></RouterView>
    </main>
</template>

<style scoped>
.flex {
    display: flex;
}

main {
    flex: 1;
    height: calc(100vh - 200px);
}

.size {
    width: calc(100% / 3);
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;
}



/* profile container */

.header-profile-container {
    display: flex;
    width: 250px;
    align-items: center;
}



.userImgHeader {
    max-height: 60px;
}


/* username font and text */
.username {
    font-size: 30px;
    font-family: var(--font-primary);
    margin-left: 1rem;
    color: #FF7403;
}

</style>
