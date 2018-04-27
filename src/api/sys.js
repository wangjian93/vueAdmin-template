import request from '@/utils/request'

export function getCodes(params) {
  return request({
    url: '/sys/code/getCodes',
    method: 'post',
    params
  })
}
