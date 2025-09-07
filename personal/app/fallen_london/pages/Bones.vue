<script setup>
import { ref } from 'vue'
import { allBonesTypes, allBonesData } from '../components/boneConstData.js'
import FilterBox from '../components/FilterBox.vue';
import SimpleTable from '../components/SimpleTable.vue';

const boneAttributes = ["Type", "Name", "Penny Value", "Antiquity", "Amalgamy", "Menace", "attributes and notes"]

let typeData = new Map();
allBonesTypes.forEach((category, index) => typeData.set(category, allBonesData[index]));

// Filter
const activeFilter = ref('');
function filterTables(type) {
  activeFilter.value = type;
}

function attributeFiltered(data) {
  if (activeFilter.value.includes('Antiquity')) {
    return data.filter((item) => item.Antiquity != null);
  }
  else if (activeFilter.value.includes('Amalgamy')) {
    return data.filter((item) => item.Amalgamy != null);
  }
  else if (activeFilter.value.includes('Menace')) {
    return data.filter((item) => item.Menace != null);
  }
  else {
    return data
  }
};
</script>

<template>
  <FilterBox :activeFilter=activeFilter @filterOption="filterTables"></FilterBox>
  <div v-for="pair in typeData">
    <h2>{{ pair[0] }}</h2>
    <SimpleTable>
      <template #head>
        <th v-for="name in boneAttributes.slice(1)">{{ name }}</th>
      </template>
      <template #body>
        <tr v-for="row in attributeFiltered(pair[1])">
          <td>{{ row[boneAttributes[1]] }}</td>
          <td>{{ row[boneAttributes[2]] }}</td>
          <td>{{ row[boneAttributes[3]] }}</td>
          <td>{{ row[boneAttributes[4]] }}</td>
          <td>{{ row[boneAttributes[5]] }}</td>
          <td>{{ row[boneAttributes[6]] }}</td>
        </tr>
      </template>
    </SimpleTable>
  </div>
</template>
