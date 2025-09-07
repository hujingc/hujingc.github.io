<script setup>
import { ref, computed } from 'vue'
import Home from './pages/index.vue'
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
  { href: '#/', name: "Home" },
  { href: '#/bones', name: "Bones" },
  { href: '#/buyers', name: "Buyers" },
  { href: '#/inventory', name: "Inventory" },
  { href: '#/calculator', name: "Calculator" }
]

const currentPath = ref('')
if (process.browser) {
  console.log('browsers')
  currentPath = window.location.hash
  window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash
  })

}

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
function isCurrentPage(page) {
  return window.location.hash == page.href
}

</script>

<template>
  <header>
    <nav>
      <ul v-for="page in pages">
        <li v-if="isCurrentPage(page)">
          <a class="currentPage" :href=page.href>{{ page.name }}</a>
        </li>
        <li v-else>
          <a :href=page.href>{{ page.name }}</a>
        </li>
      </ul>
    </nav>
  </header>
  <component :is="currentView" />
</template>

