<script setup>
import { ref, computed } from 'vue'
import constantBuyers from '../datasets/constantBuyers.json'
import occasionalBuyers from '../datasets/occasionalBuyers.json'
import SimpleTable from '../components/SimpleTable.vue'
import FilterBox from '../components/FilterBox.vue'
const buyerAttributes = ["Buyer", "Requires", "Primary Reward", "Secondary Reward", "Scaling of Secondary Reward"]

// Filter
const activeFilter = ref('');
function filterTables(type) {
  activeFilter.value = type;
}

let buyers = ref(constantBuyers);

const filteredBuyers = computed(() => {
  if (activeFilter.value === '') {
    return buyers.value;
  }
  return buyers.value.filter((item) => item.Requires.includes(activeFilter.value));
});
</script>

<template>
  <FilterBox :activeFilter=activeFilter @filterOption="filterTables"></FilterBox>
  <h2>Constant Buyers</h2>
  <SimpleTable>
    <template #head>
      <th v-for="name in buyerAttributes">{{ name }}</th>
    </template>
    <template #body>
      <tr v-for="(row, index) in filteredBuyers" :key="index">
        <template v-for="attribute in buyerAttributes">
          <td>{{ row[attribute] }}</td>
        </template>
      </tr>
    </template>
  </SimpleTable>
  <h2>Occasional Buyers</h2>
  <SimpleTable>
    <template #head>
      <th v-for="name in buyerAttributes">{{ name }}</th>
    </template>
    <template #body>
      <tr v-for="row in occasionalBuyers">
        <template v-for="attribute in buyerAttributes">
          <td>{{ row[attribute] }}</td>
        </template>
      </tr>
    </template>
  </SimpleTable>
</template>
