
import request from '../utils/reset'
export const getHandleSuppler = (currentPage,pageSize,data)=>{
    return request({
        url:`/supplier/list/search/${currentPage}/${pageSize}`,
        data,
        method:'post'
    })
}
export const getHandleMtkOk= (data)=>{
    return request({
        url:`/supplier`,
        data,
        method:'post'
    })
}
export const getHandleDel= (data)=>{
    return request({
        url:`/supplier/${data}`,
        method:'DELETE'
    })
}
export const getHandleSkip= (data)=>{
    return request({
        url:`/supplier/${data}`,
        method:'get'
    })
}
export const getHandleComp= (data)=>{
    return request({
        url:`/supplier/${data}`,
        method:'put'
    })
}