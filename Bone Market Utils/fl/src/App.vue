<script setup>
const pages = [
  { href: '/fl/index.html', name: "Home" },
  { href: '/fl/bones', name: "Bones" },
  { href: '/fl/buyers', name: "Buyers" },
  { href: '/fl/inventory', name: "Inventory" },
  { href: '/fl/optimizer', name: "Optimizer" },
  { href: '/fl/moulin', name: "Moulin" },
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

