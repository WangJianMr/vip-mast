import request from './reset'
export const getHandleStaff = (currentPage,pageSize,data)=>{
    return request({
        url:`/staff/list/search/${currentPage}/${pageSize}`,
        data,
        method:'post'
    })
}