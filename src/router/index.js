import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: {
      name: 'NovelSearch'
    },
    meta: { title: '首页' }
  },
  {
    path: '/user/login',
    name: 'Login',
    component: () => import('@/views/UserLogin'),
    meta: { title: '用户登录' }
  },
  {
    path: '/novel/search',
    name: 'NovelSearch',
    component: () => import('@/views/novel/Search'),
    meta: { title: '小说搜索' }
  },
  {
    path: '/novel/catalog',
    name: 'NovelCatalog',
    component: () => import('@/views/novel/Catalog'),
    meta: { title: '小说目录' }
  },
  {
    path: '/novel/chapter',
    name: 'NovelChapter',
    component: () => import('@/views/novel/Chapter'),
    meta: { title: '小说章节' }
  },
  {
    path: '/comic/search',
    name: 'ComicSearch',
    component: () => import('@/views/comic/Search'),
    meta: { title: '漫画搜索' }
  },
  {
    path: '/comic/catalog',
    name: 'ComicCatalog',
    component: () => import('@/views/comic/Catalog'),
    meta: { title: '漫画目录' }
  },
  {
    path: '/comic/chapter',
    name: 'ComicChapter',
    component: () => import('@/views/comic/Chapter'),
    meta: { title: '漫画章节' }
  },
  {
    path: '/owner',
    name: 'Owner',
    component: () => import('@/views/Owner'),
    meta: { title: '我的' }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test'),
    meta: { title: ' 测试页' }
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    // scrollBehavior: () => ({ y: 0 }),
    routes: routes
  })

const router = createRouter()

export default router
