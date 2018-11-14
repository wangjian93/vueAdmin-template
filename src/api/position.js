import request from '@/utils/request'

export function findPositions(params) {
  return request({
    url: '/hr/org/responsbility/findPositions',
    method: 'post',
    params
  })
}

export function transfer(params) {
  return request({
    url: '/hr/org/responsbility/transfer',
    method: 'post',
    params
  })
}

export function addPosition(params) {
  return request({
    url: '/hr/org/responsbility/addPosition',
    method: 'post',
    params
  })
}

export function deletePosition(params) {
  return request({
    url: '/hr/org/responsbility/deletePosition',
    method: 'post',
    params
  })
}

export function findPositionsHis(params) {
  return request({
    url: '/hr/org/responsbility/findPositionsHis',
    method: 'post',
    params
  })
}
