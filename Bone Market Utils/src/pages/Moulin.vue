<script setup>
import SimpleTable from '../components/SimpleTable.vue';
import prevInv from '../datasets/sampleInventory.json';
import material from '../datasets/continueManuscript.json';
import { computed } from '@vue/reactivity';
// Get stored data
let storage = window.localStorage.getItem('boneInventory')
let parsed = ''
if (storage != null) {
  console.log('using browser storage')
  parsed = JSON.parse(storage)._value
}
else {
  console.log('using file storage')
  parsed = prevInv
}

const extractedInventory = transformData(parsed)

function transformData(originalData) {
  let result = {}
  originalData.forEach(info => result[info.item] = info.count)
  return result
}

const cautionaryCount = computed(() => {
  let totalInc = 0
  let totalDec = 0
  let incTargets = material.filter((item) => item.increase == 'Cautionary')
  let decTargets = material.filter((item) => item.decrease == 'Cautionary')

  incTargets.forEach((part) => {
    let num = Math.trunc(extractedInventory[part.item] / part.number) || 0
    totalInc += num
  })
  decTargets.forEach((part) => {
    let num = Math.trunc(extractedInventory[part.item] / part.number) || 0
    totalDec += num
  })
  return { inc: totalInc, dec: totalDec }
})
const ironicCount = computed(() => {
  let totalInc = 0
  let totalDec = 0
  let incTargets = material.filter((item) => item.increase == 'Ironic')
  let decTargets = material.filter((item) => item.decrease == 'Ironic')

  incTargets.forEach((part) => {
    let num = Math.trunc(extractedInventory[part.item] / part.number) || 0
    totalInc += num
  })
  decTargets.forEach((part) => {
    let num = Math.trunc(extractedInventory[part.item] / part.number) || 0
    totalDec += num
  })
  return { inc: totalInc, dec: totalDec }
})
const tragicCount = computed(() => {
  let totalInc = 0
  let totalDec = 0
  let incTargets = material.filter((item) => item.increase == 'Tragic')
  let decTargets = material.filter((item) => item.decrease == 'Tragic')

  incTargets.forEach((part) => {
    let num = Math.trunc(extractedInventory[part.item] / part.number) || 0
    totalInc += num
  })
  decTargets.forEach((part) => {
    let num = Math.trunc(extractedInventory[part.item] / part.number) || 0
    totalDec += num
  })
  return { inc: totalInc, dec: totalDec }
})

</script>
<template>

  <div class="flex-container">
    <section class="item" style="width: 20%">
      <p>This page will calculate the number of usages for each inventory item for writing monographs at Moulin.</p>
    </section>
    <section class="item">
      <h2>Increase/Decrease totals</h2>
      <SimpleTable>
        <template #head>
          <th>Quality</th>
          <th>Increase Count</th>
          <th>Decrease Count</th>
        </template>
        <template #body>
          <tr>
            <td>Cautionary</td>
            <td>{{ cautionaryCount.inc }}</td>
            <td>{{ cautionaryCount.dec }}</td>
          </tr>
          <tr>
            <td>Ironic</td>
            <td>{{ ironicCount.inc }}</td>
            <td>{{ ironicCount.dec }}</td>
          </tr>
          <tr>
            <td>Tragic</td>
            <td>{{ tragicCount.inc }}</td>
            <td>{{ tragicCount.dec }}</td>
          </tr>
        </template>
      </SimpleTable>
    </section>
    <section class="item">
      <h2>Usages in Inventory</h2>
      <SimpleTable>
        <template #head>
          <th>Item</th>
          <th>Stored</th>
          <th>Uses</th>
        </template>
        <template #body>
          <tr v-for="part in material">
            <td>{{ part.item }}</td>
            <td>{{ extractedInventory[part.item] || 0 }}</td>
            <td>{{
              Math.trunc(
                extractedInventory[part.item] / part.number) || 0
            }}</td>
          </tr>
        </template>
      </SimpleTable>
    </section>
  </div>
</template>