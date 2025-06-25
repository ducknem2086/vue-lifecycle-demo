<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue'
import ConfigType from '@/views/config-type/config-type.vue'
import ConfigCreate from '@/views/config/config-create.vue'
import { formatDate } from '@/shared/util.ts'

const listConfig = ref<any[]>([])

const apiLink = 'http://localhost:4000'
const page = ref(1)
const itemsPerPage = 10
const listConfigType = ref<any[]>([])
watch(listConfig, (next, prev) => {
  console.log(next.length, prev.length)
})
onBeforeMount(() => {
  getConfig()
})

function getListConfigType(): void {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }
  fetch(apiLink + `/configType`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      listConfigType.value = res[0]
      console.log(res)
    })
    .catch((error) => console.error(error))
}

function goToPage(pageNum: number) {
  page.value = pageNum
}

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
      listConfig.value = res.map((x: any) => {
        return {
          ...x,
          dateTo: formatDate(new Date(x.dateTo)),
          dateFrom: formatDate(new Date(x.dateFrom)),
        }
      })
    })
    .catch((error) => console.error(error))
}

async function deleteConfig({ key }: any): void {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
  }
  await fetch(apiLink + `/config/${key}`, requestOptions)
    .then((response) => {
      getConfig()
    })
    .catch((error) => console.error(error))
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col class="v-col-4">
        <div class="d-inline-flex ga-3">
          <config-type @getListConfigType="getListConfigType"></config-type>
        </div>
      </v-col>
      <v-col class="v-col-8">
        <config-create
          :linkApi="apiLink"
          :listConfigType="listConfigType"
          @getListConfigType="getListConfigType"
          @getListConfig="getConfig"
        ></config-create>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <h2>Table list config</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :items="listConfig"
          density="compact"
          :items-per-page="itemsPerPage"
          item-key="id"
          show-expand
          v-model:page="page"
          item-value="id"
          class="elevation-1"
        >
          <template v-slot:item.data-table-expand="{ internalItem }">
            <v-btn
              class="text-yellow"
              color="primary"
              size="small"
              variant="text"
              border
              slim
              @click="deleteConfig(internalItem)"
            >
              <span class="text-red">Delete</span>
            </v-btn>
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
      </v-col>
    </v-row>
  </v-container>
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
