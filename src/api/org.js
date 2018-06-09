import request from '@/utils/request'

export function getOrgInfo(params) {
  return request({
    url: '/hr/oem/api/department/orgInfo',
    method: 'post',
    params
  })
}

export function getOrgTree(params) {
  return request({
    url: '/hr/oem/api/department/orgTree',
    method: 'post',
    params
  })
}

export function getOrgTree2(params) {
  return request({
    url: '/hr/oem/api/department/orgTree2',
    method: 'post',
    params
  })
}

export function getOrgInfoHis(params) {
  return request({
    url: '/hr/oem/api/department/orgInfoHis',
    method: 'post',
    params
  })
}

export function saveOrg(params) {
  return request({
    url: '/hr/oem/api/department/create',
    method: 'post',
    params
  })
}

export function updateOrg(params) {
  return request({
    url: '/hr/oem/api/department/update',
    method: 'post',
    params
  })
}

export function orgChangeHis(params) {
  return request({
    url: '/hr/oem/api/department/orgChangeHis',
    method: 'post',
    params
  })
}

export function findHrCodes(params) {
  return request({
    url: '/hr/oem/api/department/findHrCodes',
    method: 'post',
    params
  })
}

export function save(params) {
  return request({
    url: '/hr/oem/api/department/save',
    method: 'post',
    params
  })
}

export function release(params) {
  return request({
    url: '/hr/oem/api/department/release',
    method: 'post',
    params
  })
}

export function orgHis(params) {
  return request({
    url: '/hr/oem/api/department/orgHis',
    method: 'post',
    params
  })
}

export function orgTreeHis(params) {
  return request({
    url: '/hr/oem/api/department/orgTreeHis',
    method: 'post',
    params
  })
}

export function getOrgMrgTree(params) {
  return request({
    url: '/hr/oem/api/department/orgMrgTree',
    method: 'post',
    params
  })
}

export function abolish(params) {
  return request({
    url: '/hr/oem/api/department/abolish',
    method: 'post',
    params
  })
}

export function allAbolish(params) {
  return request({
    url: '/hr/oem/api/department/allAbolish',
    method: 'post',
    params
  })
}

export function getRelese(params) {
  return request({
    url: '/hr/oem/api/department/getRelese',
    method: 'post',
    params
  })
}
