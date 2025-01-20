<script setup></script>

<template>
    <div>
        <img src="/rocket.png" />
    </div>
</template>

<style scoped>
img {
    max-width: 125px;
    transform: rotate(45deg);
    transition: transform 1s ease;
}

img:hover {
    transform: rotate(405deg);
}
</style>
