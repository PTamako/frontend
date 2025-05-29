import { axios } from '@/utils/request'

/**
 * 查询数据更新
 *
 * @author mol
 */
export function GrowupRegPage (parameter) {
  return axios({
    url: '/GrowupReg/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 数据更新列表
 *
 * @author mol
 */
export function GrowupRegList (parameter) {
  return axios({
    url: '/GrowupReg/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加数据更新
 *
 * @author mol
 */
export function GrowupRegAdd (parameter) {
  return axios({
    url: '/GrowupReg/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑数据更新
 *
 * @author mol
 */
export function GrowupRegEdit (parameter) {
  return axios({
    url: '/GrowupReg/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除数据更新
 *
 * @author mol
 */
export function GrowupRegDelete (parameter) {
  return axios({
    url: '/GrowupReg/delete',
    method: 'post',
    data: parameter
  })
}
