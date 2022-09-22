const TOKEN = 'token'
const USER_KEY = 'userInfo'
export const setToken=(token)=>{
    localStorage.setItem(TOKEN,token)
}
export const getToken=()=>{
  return  localStorage.getItem(TOKEN)
}
export const setUserInfo=(userInfo)=>{
    localStorage.setItem(USER_KEY,JSON.stringify(userInfo))
}
export const getUserInfo=()=>{
  return  JSON.parse(localStorage.getItem(USER_KEY) || "{}")
}
export const getRemoveTokenInfo=()=>{
  console.log(123);
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(USER_KEY)
}
