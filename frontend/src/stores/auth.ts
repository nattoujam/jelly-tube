import { defineStore } from 'pinia'
import { type User } from '@supabase/supabase-js'

export const useAuth = defineStore({
  id: 'auth',
  state: () => ({
    user: null as User | null,
    emailConfirmation: false as boolean
  }),
  actions: {
    setUser(user: User, emailConfirmation: boolean = true) {
      this.user = user
      this.emailConfirmation = emailConfirmation
    }
  },
  getters: {
    isSignIn: (state): boolean => Boolean(state.user) && state.emailConfirmation
  }
})
