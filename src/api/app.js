import request from '@/utils/axios'

const app = {

    BANNER_PAGE_LIST(params){
        return request({
            url: 'app/banner/page',
            method: 'get',
            params: params
        })
    },
    BANNER_SAVE(data){
        return request({
            url: 'app/banner/save',
            method: 'POST',
            data: data
        })
    },
    BANNER_DELETE(id){
        return request({
            url: 'app/banner/' + id,
            method: 'DELETE'
        })
    },


    /*******************视频相关接口*****************/
    // 视频相关接口
    VIDEO_PAGE_LIST(params){
        return request({
            url: 'app/video/page',
            method: 'get',
            params: params
        })
    },
    // 添加 主视频
    VIDEO_SAVE(data){
        return request({
            url: 'app/video/save',
            method: 'POST',
            data: data
        })
    },
    // 视频删除
    VIDEO_DELETE(id){
        return request({
            url: 'app/video/' + id,
            method: 'DELETE'
        })
    },

     /*******************视频详情相关接口*****************/
    // 视频相关接口
    VIDEO_ITEM_PAGE_LIST(params){
        return request({
            url: 'app/videoItem/page',
            method: 'get',
            params: params
        })
    },
    // 添加 主视频
    VIDEO_ITEM_SAVE(data){
        return request({
            url: 'app/videoItem/save',
            method: 'POST',
            data: data
        })
    },
    // 视频删除
    VIDEO_ITEM_DELETE(id){
        return request({
            url: 'app/videoItem/' + id,
            method: 'DELETE'
        })
    },



}

export default app