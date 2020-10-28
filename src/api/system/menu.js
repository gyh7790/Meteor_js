import request from '@/utils/axios'

// 查询菜单详细
export function getMenu() {
    return request({
      url: 'sys/menu/getTreeByRoleId',
      method: 'get'
    })
}

// 查询菜单详细
export function getMenuIdByRoleId(query) {
  return request({
    url: 'sys/menu/getMenuIdByRoleId',
    method: 'get',
    params: query
  })
}