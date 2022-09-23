
import request from '../utils/reset'
export const getHandleSuppler = (currentPage,pageSize,data)=>{
    return request({
        url:`/supplier/list/search/${currentPage}/${pageSize}`,
        data,
        method:'post'
    })
}