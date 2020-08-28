import Vue from 'vue'
import VueRouter from 'vue-router'
import Schedule1 from '../views/Schedule1.vue'
import Schedule2 from '../views/Schedule2.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Schedule1',
    component: Schedule1
  },
  {
    path: '/schedule2',
    name: 'Schedule2',
    component: Schedule2
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


