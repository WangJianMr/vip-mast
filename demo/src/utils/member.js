import request from './reset'
export const getHandleMember = (currentPage,pageSize,data)=>{
    return request({
        url:`member/list/search/${currentPage}/${pageSize}`,
        data,
        method:'post'
    })
}
export const handleAdd = (data)=>{
    return request({
        url:`/member`,
        data,
        method:'post'
    })
}
export const handleDels = (data)=>{
    return request({
        url:`/member/${data}`,
        method:'DELETE'
    })
}
export const handelInruire = (data)=>{
    return request({
        url:`/member/${data}`,
        method:'get'
    })
}
export const handelcommpOk = (data)=>{
    return request({
        url:`/member/${data}`,
        method:'put'
    })
}