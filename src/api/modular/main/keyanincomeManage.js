import { axios } from '@/utils/request'

/**
 * 查询科研系统回写
 *
 * @author mol
 */
export function keyanincomePage (parameter) {
  return axios({
    url: '/keyanincome/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 科研系统回写列表
 *
 * @author mol
 */
export function keyanincomeList (parameter) {
  return axios({
    url: '/keyanincome/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加科研系统回写
 *
 * @author mol
 */
export function keyanincomeAdd (parameter) {
  return axios({
    url: '/keyanincome/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑科研系统回写
 *
 * @author mol
 */
export function keyanincomeEdit (parameter) {
  return axios({
    url: '/keyanincome/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除科研系统回写
 *
 * @author mol
 */
export function keyanincomeDelete (parameter) {
  return axios({
    url: '/keyanincome/delete',
    method: 'post',
    data: parameter
  })
}
