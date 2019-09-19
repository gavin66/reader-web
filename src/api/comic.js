import request from '@/utils/request'

export function search(query) {
  return request({
    url: '/comic/search',
    method: 'get',
    params: query
  })
}

export function catalog(query) {
  return request({
    url: '/comic/catalog',
    method: 'get',
    params: query
  })
}

export function chapter(query) {
  return request({
    url: '/comic/chapter',
    method: 'get',
    params: query
  })
}

export function followList(query) {
  return request({
    url: '/comic/follow',
    method: 'get',
    params: query
  })
}

export function follow(data) {
  return request({
    url: '/comic/follow',
    method: 'post',
    data
  })
}

export function unfollow(data) {
  return request({
    url: '/comic/unfollow',
    method: 'post',
    data
  })
}

export function progress(data) {
  return request({
    url: '/comic/progress',
    method: 'post',
    data
  })
}
