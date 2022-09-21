import request from './reset'
export const login = (data)=>{
    return request({
        url:'/user/login',
        data,
        method:'post'
    })
}
export const userInfoGo = (data)=>{
    return request({
        url:'/user/info/admin',
        data,
        method:'get'
    })
}