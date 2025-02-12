<script setup>
import Header from '../components/Header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
    <Header> </Header>

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


@media (max-width: 800px) {
    .flex {
        flex-direction: column;
    }
}
</style>
