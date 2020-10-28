import request from '@/utils/axios'

// 设置 角色权限
export function setEmpower(data) {
  return request({
    url: 'sys/role/setAuthorize',
    method: 'POST',
    data: data
  })
}