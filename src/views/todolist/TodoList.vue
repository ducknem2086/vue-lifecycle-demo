<style scoped lang="scss">
.bg-todo-create {
  align-items: stretch;

  .btn-group {
    display: flex;
    gap: 20px;
    height: 40px;
    justify-content: space-between;

    button {
      height: inherit;
    }
  }
}
</style>

<template>
  <v-container>
    <v-row class="px-4 bg-todo-create">
      <v-col class="v-col-8">
        <v-text-field v-model="inputCreateTodo"></v-text-field>
      </v-col>
      <v-col class="v-col-4 btn-group">
        <v-btn class="pa-2" color="primary" @click="createTodo">create</v-btn>
        <v-btn class="pa-2" color="primary" @click="removeAllTodo">reset</v-btn>
      </v-col>
    </v-row>
    <v-container v-for="item in listTodo" :key="item.id">
      <todo-list-item
        @delete="deleteTodo"
        @update="updateTodo"
        :currentTodo="item"
      ></todo-list-item>
    </v-container>
  </v-container>
</template>
<script setup lang="ts">
import { type ITodoItem, useTodoStore } from '@/stores/todo'
import { computed, ref, watchEffect } from 'vue'
import TodoListItem from '@/views/todolist/TodoListItem.vue'

const store = useTodoStore()
const listTodo = computed(() => {
  return store.todo
})
watchEffect(() => {
  console.log(listTodo.value)
})

const inputCreateTodo = ref<string>('')

/**
 * hàm tạo uuid v4 ngẫu nhiên
 */
function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * tạo todo item mới và xoá value ở ô input
 */
function createTodo() {
  store.createTodo({
    id: uuidv4(),
    content: inputCreateTodo?.value ?? '',
  } as ITodoItem)
  inputCreateTodo.value = ''
}

function updateTodo(data: ITodoItem) {
  console.log('emit data:', data)
  store.updateTodo(data)
}

function deleteTodo(id: string) {
  store.deleteTodo(id)
}

function removeAllTodo() {
  store.resetAllTodo()
}
</script>
