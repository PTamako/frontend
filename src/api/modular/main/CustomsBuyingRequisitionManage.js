import { axios } from '@/utils/request'

/**
 * 查询采购申请
 *
 * @author Mol2028
 */
export function CustomsBuyingRequisitionPage (parameter) {
  return axios({
    url: '/CustomsBuyingRequisition/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 采购申请列表
 *
 * @author Mol2028
 */
export function CustomsBuyingRequisitionList (parameter) {
  return axios({
    url: '/CustomsBuyingRequisition/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加采购申请
 *
 * @author Mol2028
 */
export function CustomsBuyingRequisitionAdd (parameter) {
  return axios({
    url: '/CustomsBuyingRequisition/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑采购申请
 *
 * @author Mol2028
 */
export function CustomsBuyingRequisitionEdit (parameter) {
  return axios({
    url: '/CustomsBuyingRequisition/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除采购申请
 *
 * @author Mol2028
 */
export function CustomsBuyingRequisitionDelete (parameter) {
  return axios({
    url: '/CustomsBuyingRequisition/delete',
    method: 'post',
    data: parameter
  })
}
