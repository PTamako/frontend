import { axios } from '@/utils/request'

/**
 * 查询培育库
 *
 * @author mol
 */
export function sme_growup_regPage (parameter) {
  return axios({
    url: '/sme_growup_reg/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 培育库列表
 *
 * @author mol
 */
export function sme_growup_regList (parameter) {
  return axios({
    url: '/sme_growup_reg/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加培育库
 *
 * @author mol
 */
export function sme_growup_regAdd (parameter) {
  return axios({
    url: '/sme_growup_reg/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑培育库
 *
 * @author mol
 */
export function sme_growup_regEdit (parameter) {
  return axios({
    url: '/sme_growup_reg/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除培育库
 *
 * @author mol
 */
export function sme_growup_regDelete (parameter) {
  return axios({
    url: '/sme_growup_reg/delete',
    method: 'post',
    data: parameter
  })
}
