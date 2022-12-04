<script setup>
import { computed, ref } from '@vue/reactivity';
import { menaceYes, amalgamyYes, antiquityYes } from '../components/boneConstData.js'
const props = defineProps(['activeFilter'])
let isAntiquity = computed(() => {
  if (props.activeFilter.includes('Antiquity')) {
    return true
  }
  else {
    return false
  }
})

let isAmalgamy = computed(() => {
  if (props.activeFilter.includes('Amalgamy')) {
    return true
  }
  else {
    return false
  }
})
let isMenace = computed(() => {
  if (props.activeFilter.includes('Menace')) {
    return true
  }
  else {
    return false
  }
})
let isAll = computed(() => {
  if (props.activeFilter == '') {
    return true
  }
  else {
    return false
  }
})
</script>
<template>
  <div>
    Filter by attribute
    <button :class="{ 'current-filter': isAntiquity }" @click="$emit('filterOption', antiquityYes)">Antiquity</button>
    <button :class="{ 'current-filter': isAmalgamy }" @click="$emit('filterOption', amalgamyYes)">Amalgamy</button>
    <button :class="{ 'current-filter': isMenace }" @click="$emit('filterOption', menaceYes)">Menace</button>
    <button :class="{ 'current-filter': isAll }" @click="$emit('filterOption', '')">All</button>
  </div>
</template>
<style scoped>
div {
  padding: 10px
}
</style>