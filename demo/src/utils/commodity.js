import request from './reset'
export const getHandleCommod = (currentPage,pageSize,data)=>{
    return request({
        url:`/goods/list/search/${currentPage}/${pageSize}`,
        data,
        method:'post'
    })
}