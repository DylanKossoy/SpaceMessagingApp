<script setup>
import { Routerlink } from 'vue-router'
import Logo from './Logo.vue'
</script>

<template>
  <header>
    <div class="container">
      <Logo />
    </div>
  </header>
</template>

<style scoped>
container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:slotted(*) {
  font-size: var(--fs-600);
}
</style>
