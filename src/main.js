// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'lib-flexible'
// import 'minireset.css'
// import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index'
import axios from 'axios'
import {getUrlParam} from './libs/utils'
import ConfirmPlugin from './plugins/confirm/index'
import LoadingPlugin from './plugins/loading/index'
import ToastPlugin from './plugins/toast/index'
// import VueLocalStorage from 'vue-localstorage'
// Vue.use(VueLocalStorage)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.config.productionTip = false

/* 判断 iphone or android 添加class */
const isIPhone = window.navigator.appVersion.match(/iphone|ipad|ipod/gi);
if (isIPhone) {
  document.body.className = 'is-iPhone'
} else {
  document.body.className = 'is-android'
}

/* FastClick */
const FastClick = require('fastclick')
FastClick.attach(document.body)


/* 向App发送消息 */
Vue.prototype.postMsgToApp = function (obj) {
  let ua = window.navigator.userAgent.toLowerCase()
  try {
    if (/iphone|ipad|ipod/.test(ua)) {
      window.webkit.messageHandlers.iOS.postMessage(obj)
    } else if (/android/.test(ua)) {
      window.Android.postMessage(JSON.stringify(obj).replace(/"/g, '\''))
    }
  } catch (e) {

  }
}

// 获取token
const token = getUrlParam('token')
store.commit('updateToken', token)
// 设置全局携带
// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(function (config) {
  // 处理请求之前的配置
  app.$vux.loading.show()
  config.headers.Authorization = 'Bearer ' + store.state.token
  return config
}, function (error) {
  // 请求失败的处理
  app.$vux.loading.hide()
  app.$vux.toast.show(error, 'bottom')
  return Promise.reject(error)
})

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(function (response) {
  // 处理响应数据
  app.$vux.loading.hide()
  return response
}, function (error) {
  // 处理响应失败
  app.$vux.toast.text(error.message, 'bottom')
  return Promise.reject(error)
})

const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
