import axios from 'axios'
import { Message } from 'element-ui'
import Cookie from 'js-cookie'
// import router from '@/router'

axios.defaults.baseURL = 'http://127.0.0.1:8083'
// axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

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
  req.headers.token = Cookie.get('token')
  return req
},
err => {
  return Promise.reject(err)
})

axiosObj.interceptors.response.use(res => {
  if (res.data.code >= 200 && res.data.code <= 300) {
    return res.data
  } else if (res.data.code === 401) {
    // 还未登入  跳转到登入界面
    Message.error(res.data.msg)
    this.router.push({ name: 'main' })
  } else {
    Message.error(res.data.msg)
    return Promise.reject(res.data)
  }
}, (error) => {
  if (error.response.status === 403) {
    Message.error(error.response.data.msg)
  } else {
    Message.error('未知异常')
  }
  return Promise.reject(error)
})

export let ajax = axiosObj
export let cookie = Cookie
