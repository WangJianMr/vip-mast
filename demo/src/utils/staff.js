import request from './reset'
export const getHandleStaff = (currentPage,pageSize,data)=>{
    return request({
        url:`/staff/list/search/${currentPage}/${pageSize}`,
        data,
        method:'post'
    })
}
export const getHandleMtkOk= (data)=>{
    return request({
        url:`/staff`,
        data,
        method:'post'
    })
}
export const getHandleDel= (data)=>{
    return request({
        url:`/staff/${data}`,
        method:'DELETE'
    })
}
export const getHandleSkip= (data)=>{
    return request({
        url:`/staff/${data}`,
        method:'get'
    })
}
export const getHandleComp= (data)=>{
    return request({
        url:`/staff/${data}`,
        method:'put'
    })
}