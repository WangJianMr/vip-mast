import request from './reset' 
export const login = (data)=>{
    return request({
        url:'/login',
        data,
        method:'post'
    })
}
export const userInfoGo = ()=>{
    return request({
        url:'/info/admin',
        method:'get'
    })
}
export const logout = ()=>{
    return request({
        url:'/logout',
        method:'post'
    })
}