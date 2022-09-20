import request from './reset'
// export const login = (params)=>$axios.post('/login',params)
export const login = (data)=>{
    return request({
        url:'/login',
        data,
        method:'post'
    })
}