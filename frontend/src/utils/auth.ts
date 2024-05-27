import { supabase } from '@/utils/supabase'
import { useAuth } from '@/stores/auth'

export const signUp = async (email: string, password: string) => {
  const { setUser } = useAuth()
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) throw new Error('Failed to signUp')
  if (!data.user) throw new Error('Cannot create user')

  setUser(data.user, Boolean(data.session))
}

export const signIn = async (email: string, password: string) => {
  const { setUser } = useAuth()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw new Error('Failed to signIn')
  if (!data.user) throw new Error('Cannot create user')

  setUser(data.user)
}

export const signOut = async () => {
  supabase.auth.signOut()
  useAuth().$reset()
}

export const checkSignIn = async () => {
  const { data, error } = await supabase.auth.getUser()

  return error ? false : Boolean(data?.user)
}

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) throw new Error('User not found')
  else return data.user
}
