import { axios } from '@/utils/request'

/**
 * 查询预借发票开
 *
 * @author mol
 */
export function lendinvoiceList (parameter) {
  return axios({
    url: '/ticketcenter/listlend',
    method: 'get',
    params: parameter
  })
}

/**
 * 查询发票开具
 *
 * @author mol
 */
export function invoicePage (parameter) {
  return axios({
    url: '/invoice/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 发票开具列表
 *
 * @author mol
 */
export function invoiceList (parameter) {
  return axios({
    url: '/invoice/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加发票开具
 *
 * @author mol
 */
export function invoiceAdd (parameter) {
  return axios({
    url: '/invoice/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑发票开具
 *
 * @author mol
 */
export function invoiceEdit (parameter) {
  return axios({
    url: '/invoice/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除发票开具
 *
 * @author mol
 */
export function invoiceDelete (parameter) {
  return axios({
    url: '/invoice/delete',
    method: 'post',
    data: parameter
  })
}
