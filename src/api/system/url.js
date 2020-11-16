import request from '@/utils/axios'

const url = {

  getPage(query){
    return request({
      url: 'sys/url/page',
      method: 'GET',
      params: query
    })
  },

  // 保存 接口信息
  save(data) {
    return request({
      url: 'sys/url/save',
      method: 'POST',
      data: data
    })
  },
  
  getCode(){
    return request({
      url: 'sys/url/getCode',
      method: 'GET'
    })
  }

}

export default url