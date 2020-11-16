import request from '@/utils/axios'

const dict = {

    // 查询菜单详细
    DICT_DATA_LIST(type) {
        return request({
            url: 'sys/dictData/' + type,
            method: 'get'
        })
    },
    DICT_DATA_BY_TYPES(types){
        return request({
            url: 'sys/dictData/getDictData',
            method: 'get',
            params: {types: types}
        })
    }
}

export default dict


