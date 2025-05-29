import { axios } from '@/utils/request'

/**
 * 查询测试
 *
 * @author Magic
 */
export function TestPage (parameter) {
  return axios({
    url: '/Test/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 测试列表
 *
 * @author Magic
 */
export function TestList (parameter) {
  return axios({
    url: '/Test/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加测试
 *
 * @author Magic
 */
export function TestAdd (parameter) {
  return axios({
    url: '/Test/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑测试
 *
 * @author Magic
 */
export function TestEdit (parameter) {
  return axios({
    url: '/Test/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除测试
 *
 * @author Magic
 */
export function TestDelete (parameter) {
  return axios({
    url: '/Test/delete',
    method: 'post',
    data: parameter
  })
}
