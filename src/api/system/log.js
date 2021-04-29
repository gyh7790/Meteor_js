import request from '@/utils/axios'

const log = {

    // 查询菜单详细
    LOG_DATA_LIST(type) {
        return request({
            url: 'sys/dictData/' + type,
            method: 'get'
        })
    },
    LOG_PAGE_LIST(params){
        return request({
            url: 'sys/operLog/page',
            method: 'get',
            params: params
        })
    }
}

export default log