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
    data: params
  })
}

export function updateEmployee(params) {
  return request({
    url: '/hr/oem/api/employee/update2',
    method: 'post',
    data: params
  })
}

export function saveEmployee2(params) {
  return request({
    url: '/hr/oem/api/employee/save3',
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
    data: params
  })
}

export function findEmployee(params) {
  return request({
    url: '/hr/oem/api/employee/findEmployee',
    method: 'post',
    params
  })
}

export function findEmployeeById(params) {
  return request({
    url: '/hr/oem/api/employee/findEmployeeById',
    method: 'post',
    params
  })
}

export function deleteEmployees(params) {
  return request({
    url: '/hr/oem/api/employee/deleteEmployees',
    method: 'post',
    params
  })
}

export function findEmployeesById(params) {
  return request({
    url: '/hr/oem/api/employee/findEmployeesById',
    method: 'post',
    params
  })
}

export function downloadExcelTemplate() {
  return request({
    url: '/SpringMVC006/load',
    method: 'get',

  })
}

export function getPersonalInformation(params) {
  return request({
    url: '/hr/oem/api/employee/getPersonalInformation',
    method: 'post',
    params
  })
}

export function getContact(params) {
  return request({
    url: '/hr/oem/api/employee/getContact',
    method: 'post',
    params
  })
}

export function getRelativeInformation(params) {
  return request({
    url: '/hr/oem/api/employee/getRelativeInformation',
    method: 'post',
    params
  })
}

export function getJobInformation(params) {
  return request({
    url: '/hr/oem/api/employee/getJobInformation',
    method: 'post',
    params
  })
}

export function updatePersonalInformation(params) {
  return request({
    url: '/hr/oem/api/employee/updatePersonalInformation',
    method: 'post',
    params
  })
}

export function updateContact(params) {
  return request({
    url: '/hr/oem/api/employee/updateContact',
    method: 'post',
    params
  })
}

export function getEmployeeForRegular(params) {
  return request({
    url: '/hr/oem/api/employee/getEmployeeForRegular',
    method: 'post',
    params
  })
}

export function regular(params) {
  return request({
    url: '/hr/oem/api/employee/regular',
    method: 'post',
    params
  })
}

export function getEmployeeGUID() {
  return request({
    url: '/hr/oem/api/employee/getEmployeeGUID',
    method: 'post'
  })
}

export function save(params) {
  return request({
    url: '/hr/oem/api/employee/save',
    method: 'post',
    params
  })
}

export function getEmployeesInfoById(params) {
  return request({
    url: '/hr/oem/api/employee/getEmployeesInfoById',
    method: 'post',
    params
  })
}
