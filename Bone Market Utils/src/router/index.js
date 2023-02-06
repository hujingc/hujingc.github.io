import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Bones from '../pages/Bones.vue'
import Buyers from '../pages/Buyers.vue'
import Inventory from '../pages/Inventory.vue'
import Calculator from '../pages/Calculator.vue'
import Optimizer from '../pages/Optimizer.vue'
import Moulin from '../pages/Moulin.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/bones',
      name: 'bones',
      component: Bones
    },
    {
      path: '/buyers',
      name: 'buyers',
      component: Buyers
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: Inventory
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: Calculator
    },
    {
      path: '/optimizer',
      name: 'optimizer',
      component: Optimizer
    },
    {
      path: '/moulin',
      name: 'moulin',
      component: Moulin
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
