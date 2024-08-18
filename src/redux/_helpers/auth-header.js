/* eslint-disable i18next/no-literal-string */
const Lang = localStorage.getItem('Lang')
export function authHeaderAPI() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('userNexus'))
  if (user && user.accessToken) {
    return { Authorization: `Bearer ${user.accessToken}`, Lang: Lang || 'EN' }
  }
  return {}
}
export function authHeaderAPI2() {
  // return authorization header with jwt token
  // const user = JSON.parse(localStorage.getItem('user'))
  // if (user && user.AccessToken) {
  //   return { Authorization: `Bearer ${user.AccessToken}`, Lang: Lang || 'EN' }
  // }
}
