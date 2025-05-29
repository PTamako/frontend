import { axios } from '@/utils/request'

/**
 * 查询经费认领
 *
 * @author mol
 */
export function bankrollapplyPage (parameter) {
  return axios({
    url: '/bankrollapply/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 经费认领列表
 *
 * @author mol
 */
export function bankrollapplyList (parameter) {
  return axios({
    url: '/bankrollapply/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 到账经费的在途认领金额
 *
 * @author mol
 */
export function amtofapplying (parameter) {
  return axios({
    url: '/bankrollapply/amtofapplying',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加经费认领
 *
 * @author mol
 */
export function bankrollapplyAdd (parameter) {
  return axios({
    url: '/bankrollapply/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑经费认领
 *
 * @author mol
 */
export function bankrollapplyEdit (parameter) {
  return axios({
    url: '/bankrollapply/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 审核经费认领
 *
 * @author mol
 */
export function bankrollapplyAudit (parameter) {
  return axios({
    url: '/bankrollapply/audit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除经费认领
 *
 * @author mol
 */
export function bankrollapplyDelete (parameter) {
  return axios({
    url: '/bankrollapply/delete',
    method: 'post',
    data: parameter
  })
}
