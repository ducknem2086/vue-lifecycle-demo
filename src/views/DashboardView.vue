<script setup lang="ts">
import HomeChild from './HomeChildView.vue'

const { title = '', content = '' } =
  defineProps <{
    title?: string
    content?: string
  }>()
</script>

<template>
  <div>
    <h1>dashboard view work !</h1>
    <p>{{ content }}</p>
    <p>{{ title }}</p>
    <HomeChild />
  </div>
</template>

<style scoped></style>
