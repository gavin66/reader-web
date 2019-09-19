import request from '@/utils/request'

export function search(query) {
  return request({
    url: '/novel/search',
    method: 'get',
    params: query
  })
}

export function catalog(query) {
  return request({
    url: '/novel/catalog',
    method: 'get',
    params: query
  })
}

export function chapter(query) {
  return request({
    url: '/novel/chapter',
    method: 'get',
    params: query
  })
}

export function followList(query) {
  return request({
    url: '/novel/follow',
    method: 'get',
    params: query
  })
}

export function follow(data) {
  return request({
    url: '/novel/follow',
    method: 'post',
    data
  })
}

export function unfollow(data) {
  return request({
    url: '/novel/unfollow',
    method: 'post',
    data
  })
}

export function progress(data) {
  return request({
    url: '/novel/progress',
    method: 'post',
    data
  })
}
