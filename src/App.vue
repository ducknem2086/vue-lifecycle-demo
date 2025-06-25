<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-responsive class="border rounded">
    <v-app class="px-5 py-2">
      <v-main>
        <RouterView />
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped>
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
