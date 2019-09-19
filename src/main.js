// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import FastClick from 'fastclick'

import App from './App'
import store from './store'
import router from './router'

import '@/permission' // permission control

FastClick.attach(document.body)

Vue.config.productionTip = false

// console.log('去修改了 body 高度')
// window.οnlοad = function() {
//   console.log('修改了 body 高度')
//   if (
//     document.documentElement.scrollHeight <=
//     document.documentElement.clientHeight
//   ) {
//     let bodyTag = document.getElementsByTagName('body')[0]
//     bodyTag.style.height =
//       (document.documentElement.clientWidth / screen.width) * screen.height +
//       'px'
//   }
//   setTimeout(function() {
//     window.scrollTo(0, 1)
//   }, 0)
//   console.log('修改了 body 高度')
// }

/* eslint-disable no-new */
new Vue({
  el: '#app-reader',
  store,
  router,
  render: h => h(App)
})
