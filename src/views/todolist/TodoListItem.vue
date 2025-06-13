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
<template class>
  <Transition :css="false" @enter="enter" @leave="leave" appear mode="in-out">
    <v-row class="my-2 bg-orange-accent-2 rounded">
      <v-col class="v-col-12">
        <!--      <input class="text-red" ref="inputElement" :value="props.currentTodo.content" />-->
        <v-text-field
          :disabled="props.currentTodo.status"
          ref="inputElement"
          :model-value="props.currentTodo.content"
        ></v-text-field>
      </v-col>
      <!--      <input class="text-red" ref="inputElement" :value="props.currentTodo.content" />-->
      <!--      <h1>{{ props.currentTodo.content }}</h1>-->
      <v-col class="v-col-12 btn-group">
        <v-btn @click.stop="toggleTaskStatus">
          {{ !props.currentTodo.status ? 'done' : 'todo' }}
        </v-btn>
        <v-btn v-if="props.isUpdate" class="pa-2" color="primary" @click.stop="updateTodo"
          >Update
        </v-btn>
        <v-btn class="pa-2" color="error" @click="removeTodo">Delete</v-btn>
      </v-col>
    </v-row>
  </Transition>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import type { ITodoItem } from '@/stores/todo.ts'
import { useTemplateRef, watchEffect } from 'vue'

const inputRef = useTemplateRef('inputElement')

const props = defineProps<{
  currentTodo: ITodoItem
  isUpdate?: boolean
}>()

/**
 * chỗ này trigger khi value của props được thay dổi
 */
watchEffect(() => {
  console.log('props changed:', props.currentTodo.content)
})

const emit = defineEmits<{
  (event: 'update', data: ITodoItem): void
  (event: 'delete', id: string): void
  (
    event: 'setStatus',
    data: {
      id: string
      status: boolean
    },
  ): void
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

/**
 * hàm này là set lại status ngược lại với status ban đầu của task
 */
function toggleTaskStatus(): void {
  const id = props.currentTodo.id
  emit('setStatus', {
    id,
    status: !props.currentTodo.status,
  })
}

function removeTodo(): void {
  emit('delete', props.currentTodo.id)
  console.log(props.currentTodo)
}

function enter(el: Element, done: () => void): void {
  gsap.fromTo(
    el,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.4, onComplete: done },
  )
}

defineOptions({
  name: 'TodoCard',
  transition: {
    css: false,
    enter(el: Element, done: () => void) {
      gsap.fromTo(
        el,
        { opacity: 0, y: -20, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, onComplete: done },
      )
    },
    leave(el: Element, done: () => void) {
      gsap.set(el, { position: 'absolute', width: (el as HTMLElement).offsetWidth })
      gsap.to(el, { opacity: 0, y: 20, scale: 0.85, duration: 0.35, onComplete: done })
    },
  },
})

function leave(el: Element, done: () => void): void {
  /**
   * animation này không chạy được bởi vì thẻ này bị xoá chứ không phải là opacity 0
   * cần sửa lại .
   */
  gsap.to(el, { opacity: 0, scale: 0.8, duration: 0.35, onComplete: done })
}
</script>
