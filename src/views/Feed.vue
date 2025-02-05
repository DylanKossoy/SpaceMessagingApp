<script setup>

const name = localStorage.getItem('firstName');



</script>

<template>
    <div class="feed-container"><h1>Hello {{ name }}</h1></div>
</template>

<style scoped>



.feed-container {
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 40px;
   backdrop-filter: blur(10px);
   box-shadow: 1rem 1rem 15rem 1rem black;
}

</style>
