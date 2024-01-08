<script setup lang="ts">
import { ref, reactive } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

let goals = reactive(["Shower", "Floss", "Walk"]);
</script>

<template>
  <section>
    <h1>Screen 1</h1>
    <div v-for="goal in goals" :key="goal">
      <input type="checkbox" :id="`${goal}_input`" />
      <label :for="`${goal}_input`">{{ goal }}</label>
    </div>
  </section>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
