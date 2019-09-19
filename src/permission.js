import Vue from 'vue'
import router from './router'
import store from './store'
import { ToastPlugin } from 'vux'
import { getToken } from '@/utils/auth' // get token from cookie

Vue.use(ToastPlugin)

// 白名单, 不跳转
const whiteList = ['/user/login']

router.beforeEach(async (to, from, next) => {
  // 显示 loading 动画
  store.commit('common/SET_IS_LOADING', true)
  // 设置 title
  store.commit('common/SET_TITLE', to.meta.title)
  // 用户是否已登录
  const hasToken = getToken()
  // 如果已登录,接下来跳转首页
  if (hasToken) {
    if (to.path === '/user/login') {
      // 在 login 页,让它跳到首页
      next({ path: '/' })
    } else {
      // 如果已经获取角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息 roles 必须是数组 例如: ['admin'] or ,['developer','editor']
          await store.dispatch('user/getInfo')
          // 导航不留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 捕获异常,删除 token 重新登录
          await store.dispatch('user/resetToken')
          Vue.$vux.toast.show({
            type: 'warn',
            text: error || 'Has Error'
          })
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    // 没有 token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在白名单内,自由进入
      next()
    } else {
      // 其他无权限页面,跳到登录页
      next(`/user/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(to => {
  store.commit('common/SET_IS_LOADING', false)
})
