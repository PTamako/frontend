import { axios } from '@/utils/request'

/**
 * 查询清欠台账
 *
 * @author mol
 */
export function smedebtapplyPage (parameter) {
  return axios({
    url: '/sme/debt/apply/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 清欠台账列表
 *
 * @author mol
 */
export function smedebtapplyList (parameter) {
  return axios({
    url: '/sme/debt/apply/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加清欠台账
 *
 * @author mol
 */
export function smedebtapplyAdd (parameter) {
  return axios({
    url: '/sme/debt/apply/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑清欠台账
 *
 * @author mol
 */
export function smedebtapplyEdit (parameter) {
  return axios({
    url: '/sme/debt/apply/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除清欠台账
 *
 * @author mol
 */
export function smedebtapplyDelete (parameter) {
  return axios({
    url: '/sme/debt/apply/delete',
    method: 'post',
    data: parameter
  })
}
