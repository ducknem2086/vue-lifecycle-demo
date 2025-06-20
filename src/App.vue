<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-responsive class="border rounded">
    <v-app class="bg-shades-black px-5 py-2">
      <v-main>
        <header class="custom-header">
<!--          <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->
          <nav class="px-3 mb-3">
            <RouterLink to="/home">Life cycle hook</RouterLink>
            <RouterLink to="/dashboard">Dashboard</RouterLink>
            <RouterLink to="/todolist">TodoList with animation</RouterLink>
            <RouterLink to="/config">config component</RouterLink>
          </nav>
        </header>
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
