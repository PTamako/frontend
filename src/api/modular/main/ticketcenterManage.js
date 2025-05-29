import { axios } from '@/utils/request'

/**
 * 查询未核销往来账
 *
 * @author mol
 */
export function caiwuclearPage (parameter) {
  return axios({
    url: '/caiwuclear/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 未核销往来账列表
 *
 * @author mol
 */
export function caiwuclearList (parameter) {
  return axios({
    url: '/caiwuclear/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加未核销往来账
 *
 * @author mol
 */
export function caiwuclearAdd (parameter) {
  return axios({
    url: '/caiwuclear/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑未核销往来账
 *
 * @author mol
 */
export function caiwuclearEdit (parameter) {
  return axios({
    url: '/caiwuclear/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除未核销往来账
 *
 * @author mol
 */
export function caiwuclearDelete (parameter) {
  return axios({
    url: '/caiwuclear/delete',
    method: 'post',
    data: parameter
  })
}
