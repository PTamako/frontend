import { axios } from '@/utils/request'

/**
 * 查询财务开票项目
 *
 * @author mol
 */
export function invoiceitemPage (parameter) {
  return axios({
    url: '/invoiceitem/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 财务开票项目列表
 *
 * @author mol
 */
export function invoiceitemList (parameter) {
  return axios({
    url: '/invoiceitem/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加财务开票项目
 *
 * @author mol
 */
export function invoiceitemAdd (parameter) {
  return axios({
    url: '/invoiceitem/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑财务开票项目
 *
 * @author mol
 */
export function invoiceitemEdit (parameter) {
  return axios({
    url: '/invoiceitem/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除财务开票项目
 *
 * @author mol
 */
export function invoiceitemDelete (parameter) {
  return axios({
    url: '/invoiceitem/delete',
    method: 'post',
    data: parameter
  })
}
