import { axios } from '@/utils/request'

/**
 * 查询科研系统项目
 *
 * @author mol
 */
export function keyanprojectPage (parameter) {
  return axios({
    url: '/keyanproject/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 科研系统项目列表
 *
 * @author mol
 */
export function keyanprojectList (parameter) {
  return axios({
    url: '/keyanproject/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加科研系统项目
 *
 * @author mol
 */
export function keyanprojectAdd (parameter) {
  return axios({
    url: '/keyanproject/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑科研系统项目
 *
 * @author mol
 */
export function keyanprojectEdit (parameter) {
  return axios({
    url: '/keyanproject/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除科研系统项目
 *
 * @author mol
 */
export function keyanprojectDelete (parameter) {
  return axios({
    url: '/keyanproject/delete',
    method: 'post',
    data: parameter
  })
}
