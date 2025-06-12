<script setup lang="ts">
import HomeChildView from '@/views/HomeChildView.vue'

const { title = '', content = '' } = defineProps<{
  title?: string
  content?: string
}>()
</script>

<template>
  <v-container>
    <h1>Dashboard view work !</h1>
    <p>{{ content }}</p>
    <p>{{ title }}</p>
    <HomeChildView />
  </v-container>
</template>

<style scoped lang="scss">

</style>
