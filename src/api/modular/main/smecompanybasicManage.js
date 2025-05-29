import { axios } from '@/utils/request'

/**
 * 查询企业基本信息
 *
 * @author mol
 */
export function smecompanybasicPage (parameter) {
  return axios({
    url: '/smecompanybasic/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 企业基本信息列表
 *
 * @author mol
 */
export function smecompanybasicList (parameter) {
  return axios({
    url: '/smecompanybasic/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加企业基本信息
 *
 * @author mol
 */
export function smecompanybasicAdd (parameter) {
  return axios({
    url: '/smecompanybasic/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑企业基本信息
 *
 * @author mol
 */
export function smecompanybasicEdit (parameter) {
  return axios({
    url: '/smecompanybasic/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除企业基本信息
 *
 * @author mol
 */
export function smecompanybasicDelete (parameter) {
  return axios({
    url: '/smecompanybasic/delete',
    method: 'post',
    data: parameter
  })
}
