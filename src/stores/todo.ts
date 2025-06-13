import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface ITodoItem {
  id: string
  content: string
  status: boolean
}

export const useTodoStore = defineStore('todo', () => {
  const todo = ref<ITodoItem[]>([])
  const count = computed(() => {
    return todo.value.length
  })

  function createTodo(data: ITodoItem) {
    console.log(data.content)
    todo.value = [...todo.value, data]
  }

  function updateTodo(data: ITodoItem) {
    const findTodo = todo.value.find((item) => item.id === data.id)
    if (findTodo) {
      findTodo.content = data.content
    }
  }

  function deleteTodo(id: string) {
    const findIndex = [...todo.value].findIndex((value) => value.id === id)
    if (findIndex) {
      todo.value.splice(findIndex, 1)
    }
  }

  function resetAllTodo() {
    todo.value = []
  }

  function doneAllTask() {
    todo.value.forEach((task) => {
      task.status = true
    })
  }

  function setTaskStatus(id: string, status: boolean) {
    const taskFind = [...todo.value].find((value) => value.id === id)
    if (taskFind) {
      taskFind.status = status
    }
  }

  return {
    todo,
    count,
    resetAllTodo,
    updateTodo,
    deleteTodo,
    createTodo,
    doneAllTask,
    setTaskStatus,
  }
})
