<script setup lang="ts">
import {
  onActivated,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onUnmounted,
  onUpdated,
  onWatcherCleanup,
  ref,
} from 'vue'
import router from '@/router'

const count = ref(0)

/**
 * hook này chạy khi component sau khi đã mount xong
 */
onMounted(() => {
  mountEvent()

  const interval = setInterval(() => {
    console.log('________')
    count.value = count.value + 3
    if (count.value >= 9) {
      clearInterval(interval)
      throw new Error('clear interval !!')
    }
  }, 3000)
})

function mountEvent() {
  console.log('mount event')
}

function navigateOtherPage() {
  console.log('before navigate event')
  router.push({
    path: '/dashboard',
    state: {
      content: '1234',
      title: 'abc',
    },
  })
}

/**
 * chỗ này chạy khi component chuẩn bị đóng
 * */
onBeforeUnmount(() => {
  console.log('beforeUnmount')
})

/**
 * hook này chạy khi component đã đóng hẳn
 */
onUnmounted(() => {
  console.log('unmounted')
})

/**
 * chỗ này chạy khi component chuẩn bị update dom
 */
onBeforeUpdate(() => {
  console.log('beforeUpdate')
})

/**
 * chỗ này chạy khi component đã update dom xong
 */
onUpdated(() => {
  console.log('updated')
})
onActivated(() => {
  console.log('activated')
})
onDeactivated(() => {
  console.log('deactivated')
})
onRenderTracked(() => {
  console.log('renderTracked')
})
onRenderTriggered(() => {
  console.log('renderTriggered')
})
onWatcherCleanup(() => {
  console.log('watcherCleanup')
})
onErrorCaptured(() => {
  console.log('errorCaptured')
})

function updateCount() {
  count.value++
}
</script>

<template>
  <div>
    <button class="btn-click" @click="updateCount">update count</button>
    <button class="btn-click" @click="navigateOtherPage">Navigate</button>
    <h1>home count: {{ count }}</h1>
  </div>
</template>

<style scoped>
.btn-click {
  padding: 20px;
  border: none;
  border-radius: 5px;
  background: #1d9acc;
  background: linear-gradient(
    90deg,
    rgba(29, 154, 204, 1) 0%,
    rgba(87, 199, 133, 1) 50%,
    rgba(237, 221, 83, 1) 100%
  );
  color: black;
  font-weight: 500;
  font-size: 15px;
  font-style: italic;
  outline: 0;
}
</style>
