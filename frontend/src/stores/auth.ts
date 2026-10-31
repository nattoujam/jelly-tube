import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
  state: () => ({
    isSignIn: false as Boolean
  }),
  actions: {
    setIsSignIn(value: Boolean) {
      this.isSignIn = value
    }
  }
})
