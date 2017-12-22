import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Attendance from '@/views/attendanceplus/index'
import Kpi from '../views/kpi/index.vue'
import html2image from '../views/test/html2image.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/attendance',
      name: 'attendance',
      component: Attendance
    },{
      path: '/kpi',
      name: 'kpi',
      component: Kpi
    },{
      path: '/html2image',
      name: 'html2image',
      component: html2image
    }
  ]
})
