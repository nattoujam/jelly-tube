export type AuthInfo = {
  uid: string
  'access-token': string
  client: string
  expiry: string
}

export const isValidAuthInfo = (arg: unknown): Boolean => {
  return (
    typeof arg === 'object' &&
    arg !== null &&
    typeof (arg as AuthInfo).uid === 'string' &&
    typeof (arg as AuthInfo)['access-token'] === 'string' &&
    typeof (arg as AuthInfo).client === 'string' &&
    typeof (arg as AuthInfo).expiry === 'string'
  )
}
