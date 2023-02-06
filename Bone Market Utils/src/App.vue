<script setup>
const pages = [
  { href: '/', name: "Home" },
  { href: '/bones', name: "Bones" },
  { href: '/buyers', name: "Buyers" },
  { href: '/inventory', name: "Inventory" },
  { href: '/optimizer', name: "Optimizer" },
  { href: '/Moulin', name: "Moulin" },
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

