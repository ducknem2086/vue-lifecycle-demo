<template>
  <div class="d-block">
    <form @submit.prevent="submitForm">
      <v-row class="mt-0">
        <v-col class="v-col-12">
          <v-text-field
            variant="outlined"
            v-model="form.name"
            label="Name"
            :error-messages="errors.name"
          />
          <v-btn type="submit" color="primary">Create config type</v-btn>
        </v-col>
      </v-row>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

const emit = defineEmits<{
  (event: 'getListConfigType'): void
}>()
const form = reactive({
  name: '',
})
const errors = reactive({
  name: '',
})

function validate() {
  let valid = true
  errors.name = ''

  if (!form.name) {
    errors.name = 'Name is required'
    valid = false
  }

  return valid
}

function submitForm() {
  const apiLink = 'http://localhost:4000'
  if (!validate()) {
    return
  }
  const { name } = form
  console.log(name)
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      name: name,
    }),
  }
  fetch(apiLink + `/configType`, requestOptions)
    .then((response) => response.json())
    .then(() => {
      form.name = ''
      emit('getListConfigType')
    })
    .catch((error) => console.error(error))
}
</script>
<style lang="scss"></style>
