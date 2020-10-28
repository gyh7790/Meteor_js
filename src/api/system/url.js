import request from '@/utils/axios'

// 设置 角色权限
export function save(data) {
  return request({
    url: 'sys/url/save',
    method: 'POST',
    data: data
  })
}

export function getCode(){
  return request({
    url: 'sys/url/getCode',
    method: 'GET'
  })
}