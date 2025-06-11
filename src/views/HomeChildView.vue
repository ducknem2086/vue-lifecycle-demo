<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue'

defineProps<{
  count: number
}>()
onBeforeMount(() => {
  console.log('beforeMount children !')
})
onMounted(() => {
  console.log('Component children mounted.')
})
</script>

<template>
  <div>
    <h1>count from parent: {{ count }}}</h1>
  </div>
</template>

<style scoped></style>
