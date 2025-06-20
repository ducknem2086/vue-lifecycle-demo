<script lang="ts" setup>
import { effect, onBeforeMount, ref } from 'vue'
import ConfigType from '@/views/config-type/config-type.vue'
import ConfigCreate from '@/views/config/config-create.vue'

const listConfig = ref<any[]>([])

const apiLink = 'http://localhost:4000'
const page = ref(1)
const itemsPerPage = 3

effect(
  () => listConfig.value.length,
  (prev, next) => {
    console.log(prev, next)
  },
)
onBeforeMount(() => {
  getConfig()
})

function goToPage(pageNum: number) {
  page.value = pageNum
}

function addConfig(): void {}

function getConfig(): void {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }

  fetch(apiLink + '/config', requestOptions)
    .then((response) => response.json())
    .then((res) => {
      // res as  stringify
      listConfig.value = res
    })
    .catch((error) => console.error(error))
}

function deleteConfig(id: string): void {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
  }
  fetch(apiLink + `/config/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      console.log(res)
    })
    .catch((error) => console.error(error))
}
</script>

<template>
  <div class="d-inline-flex ga-3 mb-3">
    <!--    <button @click="addConfig" class="px-4 rounded-xl bg-red-darken-2">Add Config</button>-->
    <v-row>
      <v-col class="col-4">
        <div class="d-inline-flex ga-3">
          <config-type></config-type>
        </div>
      </v-col>
      <v-col class="col-8">
        <config-create></config-create>
      </v-col>
    </v-row>
  </div>
  <v-data-table
    :items="listConfig"
    density="compact"
    :items-per-page="itemsPerPage"
    item-key="id"
    v-model:page="page"
    class="elevation-1"
  >
    <template #item.action="{ item }">
      <v-btn color="primary" @click="deleteConfig(item)">Edit</v-btn>
    </template>

    <!-- Custom pagination slot -->
    <template #bottom="{ pageCount, page, itemsPerPage }">
      <div class="d-flex justify-space-between align-center pa-4">
        <div>
          Page {{ page }} of {{ pageCount }}, items per page: {{ itemsPerPage }}, total:
          {{ listConfig.length }}
        </div>

        <div>
          <v-btn
            color="primary"
            variant="outlined"
            :disabled="page <= 1"
            class="mr-2"
            @click="goToPage(page - 1)"
          >
            Prev
          </v-btn>
          <v-btn
            color="primary"
            variant="outlined"
            :disabled="page >= pageCount"
            @click="goToPage(page + 1)"
          >
            Next
          </v-btn>
        </div>
      </div>
    </template>
  </v-data-table>
</template>

<style lang="scss"></style>

<!--beforeCreate: xảy ra trước tất cả các hook ( trước create) -> đại khái là ngay sau bước đọc route-->
<!--fact : chỗ này đọc được biến global state-->

<!--create : Component được khởi tạo và bạn có thể truy cập các thuộc tính của instance component-->
<!--(giống onchanges của angular )-->

<!--beforeMount : khởi tạo xong nhưng chưa gắn vào dom -> không thể tìm kiếm dom ở đây ( giống oninit cũng-->
<!--không tìm thấy template ref )-->

<!--Mounted : dom được load xong ( giống hook after content init của angular)-->
<!--beforeUpdate: đại khái là khi có 1 biến được thay đổi giá trị và trên dom cần cập nhật lại-->
<!-- -> thì hook này chạy trước khi làm việc đó-->

<!--updated: cũng có use giống trên nhưng chạy sau khi việc update trên DOM được hoàn tất-->

<!--beforeUnmount : chạy trước khi component được destroy ( giống onDestroy của angular )-->
<!--unMount: sau khi component đã hoàn tất việc đã được destroy -->
