import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from '../views/Top.vue'
import Schedule from '../views/Schedule.vue'
import Chime from '../views/Chime.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/Schedule',
    name: 'Schedule',
    component: Schedule
  },
  {
    path: '/',
    name: 'Top',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Top
  },
  {
    path: '/Chime',
    name: 'Chime',
    component: Chime
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


