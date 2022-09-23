import request from './reset'
export const getHandleMember = (currentPage,pageSize,data)=>{
    return request({
        url:`member/list/search/${currentPage}/${pageSize}`,
        data,
        method:'post'
    })
}