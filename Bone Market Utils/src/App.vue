<script setup>
import Home from './pages/Home.vue'
import Bones from './pages/Bones.vue'
import Buyers from './pages/Buyers.vue'
import Inventory from './pages/Inventory.vue'
import Calculator from './pages/Calculator.vue'

const routes = {
  '/': Home,
  '/bones': Bones,
  '/buyers': Buyers,
  '/inventory': Inventory,
  '/calculator': Calculator
}
const pages = [
  { href: '/', name: "Home" },
  { href: '/bones', name: "Bones" },
  { href: '/buyers', name: "Buyers" },
  { href: '/inventory', name: "Inventory" },
  { href: '/calculator', name: "Calculator" }
]

</script>

<template>
  <header>
    <nav>
      <ul v-for="page in pages">
        <router-link :to=page.href>{{ page.name }}</router-link>
      </ul>
    </nav>
  </header>
  <router-view></router-view>
</template>

