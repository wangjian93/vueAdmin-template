import request from '@/utils/request'

export function getPromotionInfo(params) {
  return request({
    url: '/hr/oem/api/promotion/getPromotionInfo',
    method: 'post',
    params
  })
}

export function findPromotion(params) {
  return request({
    url: '/hr/oem/api/promotion/findPromotion',
    method: 'post',
    params
  })
}

export function promote(params) {
  return request({
    url: '/hr/oem/api/promotion/promote',
    method: 'post',
    params
  })
}

export function findPromotionHis(params) {
  return request({
    url: '/hr/oem/api/promotion/findPromotionHis',
    method: 'post',
    params
  })
}
