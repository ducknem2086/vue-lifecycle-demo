<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    //
    // expose to template and other options API hooks
    return {
      count,
    }
  },

  beforeCreate() {
    console.log('beforeCreate', this.count)
    this.count++
  },

  mounted() {
    console.log('finished mount ', this.count) // 0
  },

  updated() {
    console.log(this.count)
  },
}
</script>
<template>
  <button @click="count++">
    {{ count }}
  </button>
</template>

<style></style>
