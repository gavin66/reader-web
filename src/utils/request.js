import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Vue from 'vue'
import { ToastPlugin, ConfirmPlugin } from 'vux'

Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

// create an axios instance
const service = axios.create({
  baseURL: process.env.READER_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 8000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 设置 api
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    Vue.$vux.toast.show({
      type: 'warn',
      text: '请求超时'
    })
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Vue.$vux.toast.show({
        type: 'warn',
        text: res.message || 'Error'
      })
      if (res.code === 50010) {
        Vue.$vux.confirm.show({
          title: '您未登录或已退出登录',
          content: '去登录吧',
          showCancelButton: false,
          onConfirm: () => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          }
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    try {
      let status = error.response.status
      if (status === 404 || status === 500) {
        Vue.$vux.toast.show({
          type: 'warn',
          text: '服务器被干掉了⊙﹏⊙'
        })
      } else {
        Vue.$vux.toast.show({
          type: 'warn',
          text: '未知错误'
        })
      }
    } catch (e) {
      console.log(error)
    }
    return Promise.reject(error)
  }
)

export default service
