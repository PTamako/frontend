import { axios } from '@/utils/request'

/**
 * 查询差旅费报销
 *
 * @author Mol2028
 */
export function 差旅费报销Page (parameter) {
  return axios({
    url: '/差旅费报销/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 差旅费报销列表
 *
 * @author Mol2028
 */
export function 差旅费报销List (parameter) {
  return axios({
    url: '/差旅费报销/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加差旅费报销
 *
 * @author Mol2028
 */
export function 差旅费报销Add (parameter) {
  return axios({
    url: '/差旅费报销/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑差旅费报销
 *
 * @author Mol2028
 */
export function 差旅费报销Edit (parameter) {
  return axios({
    url: '/差旅费报销/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除差旅费报销
 *
 * @author Mol2028
 */
export function 差旅费报销Delete (parameter) {
  return axios({
    url: '/差旅费报销/delete',
    method: 'post',
    data: parameter
  })
}
