import request from '@/utils/axios'

export default {
  getPage(query){
    return request({
      url: 'sysdev/urlDebug/page',
      method: 'GET',
      params: query
    })
  },
}