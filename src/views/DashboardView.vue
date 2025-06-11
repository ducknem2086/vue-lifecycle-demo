<script setup lang="ts">
defineProps<{
  title: string
  content: string
}>()
</script>

<template>
  <div>
    <h1>dashboard view work !</h1>
    <p>{{ content }}</p>
    <p>{{ title }}</p>
  </div>
</template>

<style scoped></style>
