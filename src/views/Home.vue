<script setup>
import Header from '../components/Header.vue'
</script>

<template>
    <Header>
        <nav>
            <RouterLink to="/join">Join</RouterLink>
            <RouterLink to="/signin">Sign In</RouterLink>
        </nav>
    </Header>

    <main>
        <div class="container">
            <div class="message-container">
                <h1>Welcome!</h1>
            </div>
        </div>
    </main>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
}

.message-container {
    width: 400px;
    height: 500px;
    background: rgba(137, 139, 144, 0.036);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 30px;
    border: 2px solid var(--color-form-border);
    color: var(--color-form-border);
}
</style>
