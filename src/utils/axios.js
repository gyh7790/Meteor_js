import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getToken } from './auth'
// import router from '@/router'

axios.defaults.baseURL=process.env.VUE_APP_URL
// axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
axios.defaults.headers['version'] = process.env.VUE_APP_VERSIONS
// axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

let axiosObj = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Acces-Control-Max-Age': 0,
    'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  },
  timeout: 60000 * 2
})

axiosObj.defaults.transformRequest = (data) => {
  return JSON.stringify(data)
}

axiosObj.interceptors.request.use(req => {
  if (store.getters.token) {
    req.headers.token = getToken()
  }
  return req
},(err) => {
  return Promise.reject(err)
})

axiosObj.interceptors.response.use(res => {
  if (res.data.code >= 200 && res.data.code <= 300) {
    return res.data
  } else if (res.data.code === 401) {
    // 还未登入  跳转到登入界面
    Message.error(res.data.msg)
    this.router.push({ name: 'main' })
  } else if (typeof(res.data) == 'string') {
    return Promise.reject(res.data)
  } else {
    Message.error(res.data.msg)
    return Promise.reject(res.data)
  }
}, (error) => {
  if (error.response != undefined && error.response.status === 403) {
    Message.error(error.response.data.msg)
  } else {
    Message.error('未知异常')
  }
  return Promise.reject(error)
})

const getParam = function(url, params){
  return axiosObj.request({
    method: 'GET',
    url: url,
    params: params
  });
}

axiosObj.get = getParam

export default axiosObj
