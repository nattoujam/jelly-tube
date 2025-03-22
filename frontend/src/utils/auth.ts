import { type AuthInfo, isValidAuthInfo } from '@/types/authInfo'

import { useAuth } from '@/stores/auth'
import { authClient } from '@/utils/authClient'
import { AxiosError } from 'axios'

const LOCAL_STORAGE_AUTH_KEY = 'jt-auth-info'

const saveAuthInfo = (authInfo: AuthInfo) => {
  localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(authInfo))
}

export const getAuthInfo = (): AuthInfo | undefined => {
  const authInfoStr = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
  if (!authInfoStr) return undefined

  const authInfo: unknown = JSON.parse(authInfoStr)

  if (isValidAuthInfo(authInfo)) return authInfo as AuthInfo
  else return undefined
}

const deleteAuthInfo = () => {
  localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY)
}

export const signUp = async (email: string, password: string) => {
  try {
    const res = await authClient.post('', {
      email,
      password,
      confirm_success_url: window.location.origin
    })

    const authInfo = {
      uid: res.data.uid,
      'access-token': res.headers['access-token'],
      client: res.headers.client,
      expiry: res.headers.expiry
    }

    saveAuthInfo(authInfo)
  } catch (e: unknown) {
    if (e instanceof AxiosError) throw new Error(e.response?.data.errors.full_messages)
    else throw new Error('Unknown error')
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const res = await authClient.post('/sign_in', {
      email,
      password
    })

    const authInfo = {
      uid: res.headers.uid,
      'access-token': res.headers['access-token'],
      client: res.headers.client,
      expiry: res.headers.expiry
    }

    saveAuthInfo(authInfo)
  } catch (e: unknown) {
    if (e instanceof AxiosError) throw new Error(e.response?.data.errors)
    else throw new Error('Unknown error')
  }
}

export const signOut = async () => {
  const authInfo = getAuthInfo()
  if (!authInfo) return

  try {
    await authClient.delete('/sign_out', { headers: authInfo })
    deleteAuthInfo()
    useAuth().$reset()
  } catch (e: unknown) {
    if (e instanceof AxiosError) throw new Error(e.response?.data.errors)
    else throw new Error('Unknown error')
  }
}

export const checkSignIn = async (): Promise<Boolean> => {
  const { setIsSignIn } = useAuth()
  const authInfo = getAuthInfo()
  if (!authInfo) return false

  try {
    const res = await authClient.get('/validate_token', {
      params: authInfo
    })

    setIsSignIn(res.data.success)
    return res.data.success
  } catch (e: unknown) {
    return false
  }
}
