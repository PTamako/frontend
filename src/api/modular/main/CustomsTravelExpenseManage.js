import { axios } from '@/utils/request'

/**
 * 查询差旅费报销
 *
 * @author Mol2028
 */
export function CustomsTravelExpensePage (parameter) {
  return axios({
    url: '/CustomsTravelExpense/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 差旅费报销列表
 *
 * @author Mol2028
 */
export function CustomsTravelExpenseList (parameter) {
  return axios({
    url: '/CustomsTravelExpense/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加差旅费报销
 *
 * @author Mol2028
 */
export function CustomsTravelExpenseAdd (parameter) {
  return axios({
    url: '/CustomsTravelExpense/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑差旅费报销
 *
 * @author Mol2028
 */
export function CustomsTravelExpenseEdit (parameter) {
  return axios({
    url: '/CustomsTravelExpense/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除差旅费报销
 *
 * @author Mol2028
 */
export function CustomsTravelExpenseDelete (parameter) {
  return axios({
    url: '/CustomsTravelExpense/delete',
    method: 'post',
    data: parameter
  })
}
