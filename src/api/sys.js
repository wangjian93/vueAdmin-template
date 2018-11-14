import request from '@/utils/request'

export function getCodes(params) {
  return request({
    url: '/sys/code/getCodes',
    method: 'post',
    params
  })
}

export function saveCode(params) {
  return request({
    url: '/sys/code/save',
    method: 'post',
    params
  })
}

export function getEmployeeSelectOptions(params) {
  return request({
    url: '/sys/code/getEmployeeSelectOptions',
    method: 'post',
    params
  })

}
