<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-responsive class="border rounded">
    <v-app class="px-5 py-0">
      <v-main class="dp__relative">
        <RouterView />
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped>
@import 'tailwindcss';

body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.custom-header {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>
