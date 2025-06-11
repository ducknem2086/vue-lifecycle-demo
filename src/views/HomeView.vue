<script setup lang="ts">
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  ref,
  type Ref,
} from 'vue'
import router from '@/router'

const count: Ref<string> = ref('0')
const isEven = computed(() => {
  return count.value % 2 === 0
})
const stateData = reactive({
  count,
  isEven,
})

function mountEvent(param: string): number {
  console.log('value khi chay vao hook', count.value)
  count.value++
  console.log('xu li o trong hook ' + param + ' xong:', count.value)
}

/**
 * hook này là chạy khi route đã được đọc, component instance được tạo nhưng chưa được mount (render dom) xong
 */
onBeforeMount(() => {
  mountEvent('beforeMount')
})

/**
 * hook này chạy khi component sau khi đã mount/render lần đầu xong
 */
onMounted(() => {
  mountEvent('onMounted')
})

function navigateToDashboard() {
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
  mountEvent('onBeforeUnmount')
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
  mountEvent('onBeforeUpdate')
})

/**
 * chỗ này chạy khi component đã update dom xong
 */
onUpdated(() => {
  // console.log('dom đã được cập nhật lại !')
  console.log('dom update xong :', stateData.count, stateData.isEven)
})

function updateCount(isIncrease: boolean) {
  const message = isIncrease ? 'tăng' : 'giảm'
  if (!isIncrease) {
    count.value = count.value - 2
  } else count.value++
  console.log('count trước khi  ' + message, count.value, typeof count.value)
  console.log('count sau khi ' + message, count.value, typeof count.value)
}

/**
 * @note: sau khi các hook render dom chạy xong thì hàm của input mới chạy tới
 * và giá trị lúc này là giá trị mới nhất .
 */
function eventPress(event: Event) {
  console.log('eventPress event', event.target.value)
}
</script>

<template>
  <div class="btn-group">
    <button class="btn-click" @click="updateCount(true)">count++</button>
    <button class="btn-click" @click="updateCount(false)">count--</button>
    <button class="btn-click" @click="navigateToDashboard">Navigate to dashboard</button>
    <div>
      <p>home count</p>
      <input @keyup="eventPress($event)" v-model="count" />
      <time :title="'time'" :datetime="'DD/MM/YYYY'"></time>
      <h3>là số {{ isEven ? 'chẵn' : 'lẻ' }}</h3>
    </div>
  </div>
</template>

<style scoped>
.btn-group {
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 20px;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.btn-click {
  padding: 20px;
  border: none;
  margin: 0 20px;
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

  &:first-child {
    margin-left: 0;
  }
}
</style>
