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
      path: '/fl/index.html',
      name: 'home',
      component: Home
    },
    {
      path: '/fl/bones',
      name: 'bones',
      component: Bones
    },
    {
      path: '/fl/buyers',
      name: 'buyers',
      component: Buyers
    },
    {
      path: '/fl/inventory',
      name: 'inventory',
      component: Inventory
    },
    {
      path: '/fl/calculator',
      name: 'calculator',
      component: Calculator
    },
    {
      path: '/fl/optimizer',
      name: 'optimizer',
      component: Optimizer
    },
    {
      path: '/fl/moulin',
      name: 'moulin',
      component: Moulin
    }
  ]
})

export default router
