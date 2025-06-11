import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
    }
  },
  getters: {
    getCount: (state) => state.count,
    upCount: (state) => state.count + 1,
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    randomCount() {
      this.count = +(100 * Math.random()).toFixed(0)
    },
  },
})
