<script setup></script>

<template>
    <div>
        <img src="/rocket.png" />
    </div>
</template>

<style scoped>
img {
    max-width: 85px;
    transform: rotate(45deg);
}

img {
    animation: rocketship-animation 20s infinite;
}

@media (max-width: 1440px) {
    img {
        width: 100px;
    }
}

@media (max-width: 600px) {
    img {
        max-width: 80px;
    }
}
</style>
