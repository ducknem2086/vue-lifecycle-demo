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
    <v-row>
      <v-col class="v-col-7 v-col-xl-8">
        <v-row class="bg-todo-create">
          <v-col class="v-col-auto d-inline-flex justify-center align-center ga-3">
            <div>task not done: {{ reactiveData.lengthNotDone }}</div>
            <div class="d-inline-flex ga-3">
              <v-btn class="pa-2" color="primary" @click="doneAllTask">done all</v-btn>
              <v-btn class="pa-2" color="primary" @click="removeAllTodo">reset</v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="v-col-12 pa-0">
            <v-text-field
              style="width: 100%"
              placeholder="nhập task cần done"
              v-model="inputCreateTodo"
              @keyup.enter="createTodo"
            ></v-text-field>
          </v-col>
        </v-row>

        <template v-for="item in listTodoNotDone" :key="item.id">
          <todo-list-item
            @delete="deleteTodo"
            @update="updateTodo"
            @setStatus="toggleTaskStatus"
            :isUpdate="true"
            :currentTodo="item"
          ></todo-list-item>
          <!--          <v-divider-->
          <!--            v-if="index !== reactiveData.lengthNotDone - 1"-->
          <!--            :thickness="1"-->
          <!--            class="py-2 border-opacity-100"-->
          <!--            color="success"-->
          <!--          ></v-divider>-->
        </template>
      </v-col>
      <v-col class="v-col-5 v-col-xl-4 text-center">
        <pre>task done: {{ reactiveData.lengthDone }}</pre>
          <v-container v-for="item in listTodoAsDone" :key="item.id" class="py-0">
            <todo-list-item
              @delete="deleteTodo"
              @update="updateTodo"
              @setStatus="toggleTaskStatus"
              :currentTodo="item"
            ></todo-list-item>
            <!--          <v-divider-->
            <!--            v-if="index !== reactiveData.lengthNotDone - 1"-->
            <!--            :thickness="1"-->
            <!--            class="py-2 border-opacity-100"-->
            <!--            color="success"-->
            <!--          ></v-divider>-->
          </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { type ITodoItem, useTodoStore } from '@/stores/todo'
import { computed, reactive, ref, watchEffect } from 'vue'
import TodoListItem from '@/views/todolist/TodoListItem.vue'

const store = useTodoStore()
const listTodoNotDone = computed(() => {
  return store.todo.filter((x) => !x.status)
})
const listTodoAsDone = computed(() => {
  return store.todo.filter((x) => x.status)
})

const reactiveData = reactive({
  lengthDone: listTodoNotDone.value.length,
  lengthNotDone: listTodoAsDone.value.length,
})

watchEffect(() => {
  reactiveData.lengthDone = listTodoAsDone.value.length
  reactiveData.lengthNotDone = listTodoNotDone.value.length
  console.log('effect run ________')
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
function createTodo(): void {
  if (!inputCreateTodo.value.length) {
    return
  }
  store.createTodo({
    id: uuidv4(),
    content: inputCreateTodo?.value ?? '',
  } as ITodoItem)
  inputCreateTodo.value = ''
}

function updateTodo(data: ITodoItem): void {
  console.log('emit data:', data)
  store.updateTodo(data)
}

function deleteTodo(id: string): void {
  console.log('emit data:', id)
  store.deleteTodo(id)
}

function removeAllTodo(): void {
  store.resetAllTodo()
}

function doneAllTask(): void {
  store.doneAllTask()
}

function toggleTaskStatus({ id, status }: { id: string; status: boolean }): void {
  store.setTaskStatus(id, status)
}
</script>
