import Vue from 'vue'
import VueRouter from "vue-router";
import Login from '../views/login/'
Vue.use(VueRouter)
const layout = () => import('../layout')
const commodity = () => import('../views/login/commodity')
const home = () => import('../views/login/home')
const member = () => import('../views/login/member')
const staff = () => import('../views/login/staff')
const supplier = () => import('../views/login/supplier')
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'layout',
    redirect:'/home',
    component: layout,
    children: [
      {
        path: '/commodity',
        name: 'commodity',
        component: commodity,
        meta:{
          title:"商品管理"
        },
      },
      {
        path: '/home',
        name: 'home',
        component: home,
        meta:{
          title:"首页"
        },
      },
      {
        path: '/member',
        name: 'member',
        component: member,
        meta:{
          title:"会员管理"
        },
      },
      {
        path: '/staff',
        name: 'staff',
        component: staff,
        meta:{
          title:"员工管理"
        },
      },
      {
        path: '/supplier',
        name: 'supplier',
        component: supplier,
        meta:{
          title:"供应商管理"
        },
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
