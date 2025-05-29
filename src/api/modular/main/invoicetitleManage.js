import { axios } from '@/utils/request'

/**
 * 查询发票抬头管理
 *
 * @author mol
 */
export function invoicetitlePage (parameter) {
  return axios({
    url: '/invoicetitle/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 发票抬头管理列表
 *
 * @author mol
 */
export function invoicetitleList (parameter) {
  return axios({
    url: '/invoicetitle/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加发票抬头管理
 *
 * @author mol
 */
export function invoicetitleAdd (parameter) {
  return axios({
    url: '/invoicetitle/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑发票抬头管理
 *
 * @author mol
 */
export function invoicetitleEdit (parameter) {
  return axios({
    url: '/invoicetitle/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除发票抬头管理
 *
 * @author mol
 */
export function invoicetitleDelete (parameter) {
  return axios({
    url: '/invoicetitle/delete',
    method: 'post',
    data: parameter
  })
}
