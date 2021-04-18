import Vue from 'vue'
import VueRouter from 'vue-router'
import FormCreate from '../views/form-create/form-create.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'FormCreate',
    component: FormCreate
  },
  {
    path: '/form-views',
    name: 'FormViews',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/form-views/form-views.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
