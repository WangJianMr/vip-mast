import request from './reset'
export const getHandleCommod = (currentPage,pageSize,data)=>{
    return request({
        url:`/goods/list/search/${currentPage}/${pageSize}`,
        data,
        method:'post'
    })
}

export const handleAdd = (data)=>{
    return request({
        url:`/goods`,
        data,
        method:'post'
    })
}
export const handleDels = (data)=>{
    return request({
        url:`/goods/${data}`,
        method:'DELETE'
    })
}
export const handelInruire = (data)=>{
    return request({
        url:`/goods/${data}`,
        method:'get'
    })
}
export const handelcommpOk = (data)=>{
    return request({
        url:`/goods/${data}`,
        method:'put'
    })
}
export const handelSupplierName = (currentPage,pageSize,data)=>{
    return request({
        url:`/supplier/list/search/${currentPage}/${pageSize}`,
        data,
        method:'post'
    })
}