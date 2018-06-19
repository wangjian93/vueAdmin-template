import request from '@/utils/request'

export function getEmployeeList(params) {
  return request({
    url: '/hr/oem/api/employee/empInfo',
    method: 'post',
    params
  })
}

export function getEmpBasicInfra(params) {
  return request({
    url: '/hr/oem/api/employee/empInfo',
    method: 'post',
    params
  })
}

export function queryOrgUnit(params) {
  return request({
    url: '/hr/oem/api/employee/empInfo',
    method: 'post',
    params
  })
}

export function getEmpMainData(params) {
  return request({
    url: '/hr/oem/api/employee/empInfo',
    method: 'post',
    params
  })
}

export function getIssuedOrgUnitInfra(params) {
  return request({
    url: '/hr/oem/api/employee/empInfo',
    method: 'post',
    params
  })
}

export function generateEmpNumber(params) {
  return request({
    url: '/hr/oem/api/employee/empInfo',
    method: 'post',
    params
  })
}

export function saveEmp(params) {
  return request({
    url: '/hr/oem/api/employee/create',
    method: 'post',
    params
  })
}

export function createFamily(params) {
  return request({
    url: '/hr/oem/api/employee/createFamily',
    method: 'post',
    params
  })
}

export function getEmpInfo(params) {
  return request({
    url: 'hr/oem/api/employee/getEmpInfo',
    method: 'post',
    params
  })
}

export function getFamily(params) {
  return request({
    url: 'hr/oem/api/employee/getFamily',
    method: 'post',
    params
  })
}

export function getPromotion(params) {
  return request({
    url: 'hr/oem/api/employee/getPromotion',
    method: 'post',
    params
  })
}

export function getPosition(params) {
  return request({
    url: '/hr/org/responsbility/getPosition',
    method: 'post',
    params
  })
}

export function getPositionList(params) {
  return request({
    url: '/hr/oem/position/getPosition',
    method: 'post',
    params
  })
}


export function updateEmp(params) {
  return request({
    url: '/hr/oem/api/employee/updateEmp',
    method: 'post',
    params
  })
}

export function saveEmployee(params) {
  return request({
    url: '/hr/oem/api/employee/save2',
    method: 'post',
    params
  })
}

export function queryNotSubmitEmployee(params) {
  return request({
    url: '/hr/oem/api/employee/queryNotSubmitEmployee',
    method: 'post',
    params
  })
}

export function submitEmployeeBatch(params) {
  return request({
    url: '/hr/oem/api/employee/submitEmployeeBatch',
    method: 'post',
    params
  })
}
