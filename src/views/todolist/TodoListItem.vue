<style scoped lang="scss">
.background-todo-item,
.btn-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 20px;
  width: 100%;
}
</style>
<template>
  <v-row>
    <v-col class="v-col-8">
      <!--      <input class="text-red" ref="inputElement" :value="props.currentTodo.content" />-->
      <v-text-field ref="inputElement" :model-value="props.currentTodo.content"></v-text-field>
    </v-col>
    <!--      <input class="text-red" ref="inputElement" :value="props.currentTodo.content" />-->
    <!--      <h1>{{ props.currentTodo.content }}</h1>-->
    <v-col class="v-col-4 btn-group">
      <v-btn class="pa-2" color="primary" @click="updateTodo">Update</v-btn>
      <v-btn class="pa-2" color="error" @click="removeTodo">Delete</v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { ITodoItem } from '@/stores/todo.ts'
import { useTemplateRef, watchEffect } from 'vue'

const inputRef = useTemplateRef('inputElement')

const props = defineProps<{
  currentTodo: ITodoItem
}>()
/**
 * chỗ này value từ store với value của
 */
watchEffect(() => {
  console.log('props changed:', props.currentTodo.content)
})
const emit = defineEmits<{
  (event: 'update', data: ITodoItem): void
  (event: 'delete', id: string): void
}>()

function updateTodo(): void {
  /**
   * chỗ input ref này có vấn đề :
   * value lần đầu là lấy ra input instance:
   * phải chấm value tiếp mới ra được value của input để cập nhật
   */
  emit('update', {
    content: inputRef?.value?.value ?? '',
    id: props.currentTodo.id,
  })
}

function removeTodo(id: string): void {
  emit('delete', id)
}
</script>
