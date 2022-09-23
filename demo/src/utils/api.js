import request from './reset' 
export const login = (data)=>{
    return request({
        url:'/user/login',
        data,
        method:'post'
    })
}
export const userInfoGo = ()=>{
    return request({
        url:'/user/info/admin',
        method:'get'
    })
}
export const logout = ()=>{
    return request({
        url:'/user/logout',
        method:'post'
    })
}



export const login1 = (data)=>{
    return request({
        url:'/login',
        method:'post',
        data,
        proxy:process.env.VUE_APP_DEVS
    })
}