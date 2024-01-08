<script setup>
// Components
import FilterBox from '../components/FilterBox.vue';
import SimpleTable from '../components/SimpleTable.vue';
// Imports & Data
import { ref, reactive, computed } from 'vue'
import constantBuyers from '../datasets/constantBuyers.json'
import items from '../datasets/items.json'
import {
  allBonesTypes, allBonesData, torsoReference, skulls, arms, legs, wings, fins, tentacles, tails, torsos
} from '../components/boneConstData.js'

const itemValues = {};
items.forEach(info => itemValues[info.Name] = info["Penny Value"]);

const typeData = new Map();
allBonesTypes.forEach((category, index) => typeData.set(category, allBonesData[index]));

// Table Header and values
const buyerRewardHeaders = ["Buyer", "Reward", "Count", "Value", "Total Value"]//, "Scaling of Secondary Reward"]
const boneAttributesHeader = ["Name", "Val.", "An.", "Am.", "Me.", '']
const boneAttributesTable = ["Name", "Penny Value", "Antiquity", "Amalgamy", "Menace"]
// Select options
const skeletonTypes = ["Bird", "Chimera", "Spider", "Insect"]

// Filter
const activeFilter = ref('');
function filterTables(type) {
  activeFilter.value = type;
}

let allBuyers = ref(constantBuyers);
const filteredBuyers = computed(() => {
  if (activeFilter.value === '') {
    return allBuyers.value;
  }
  return allBuyers.value.filter((item) => item.Requires.includes(activeFilter.value));
});


// Store
let allBonesUsed = reactive({})

allBonesTypes.forEach((category) => { if (category != torsos) { allBonesUsed[category] = {} } else { allBonesUsed["Chosen Torso"] = "" } });
// Button Functions
function addBone(type, name) {

  let max = 0
  let current = currentSkulls.value
  switch (type) {
    case skulls:
      max = maxSkulls.value
      break;
    case arms, legs:
      max = maxLimbs.value
      break;
    case tails:
      max = maxTails.value
  }
  if (current < max) {
    allBonesUsed[type][name] = allBonesUsed[type][name] + 1 || 1;
  }
}
function evaluateBone() { }
function subtractBone(type, name) {
  allBonesUsed[type][name] = allBonesUsed[type][name] - 1 || 0;
  if (allBonesUsed[type][name] < 1) {
    delete allBonesUsed[type][name]
  }
}
function chooseTorso(name) {
  allBonesUsed["Chosen Torso"] = name
  maxSkulls.value = torsoReference[name]["Skull Space"]
  maxLimbs.value = torsoReference[name]["Limb Space"]
  maxTails.value = torsoReference[name]["Tail Space"]
  if (currentSkulls.value > maxSkulls.value) {
    console.log(allBonesUsed["Skulls"])
    allBonesUsed.skulls = {}
    console.log(allBonesUsed["Skulls"])
  }
}
// Calculator result values
let totalMenace = ref(0)
let totalAntiquity = ref(0)
let totalAmalgamy = ref(0)
let maxSkulls = ref(0)
let maxLimbs = ref(0)
let maxTails = ref(0)
let currentSkulls = computed(() => { return Object.values(allBonesUsed[skulls]).reduce((a, b) => a + b, 0) })
let currentLimbs = ref(0)
let currentTails = ref(0)
let selectSkeleton = ref('')

let categories = ['Target Skeleton Type', 'Menace', 'Antiquity', 'Amalgamy', 'Final Skeleton Type']
let categoryData = [selectSkeleton, totalMenace, totalAntiquity, totalAmalgamy, 'Chimera']
let summaryData = categories.map((id, index) => {
  return {
    name: id,
    value: categoryData[index]
  }
});
let skeletonvalue = 6500


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
  maxSkulls: {{ maxSkulls }}
  <br />
  current skulls{{ currentSkulls }}
  <FilterBox :activeFilter=activeFilter @filterOption="filterTables"></FilterBox>
  <label>Target Buyer:</label>
  <select>
    <option v-for="buyer in filteredBuyers">{{ buyer.Buyer }}</option>
  </select>
  <label>Target Skeleton Type:</label>
  <select v-model="selectSkeleton">
    <option v-for="skeleton in skeletonTypes">{{ skeleton }}</option>
  </select>
  <div class="grid-container">
    <div class="flex-container">
      <div class="item" v-for="pair in typeData">
        <div>
          <h2>{{ pair[0] }}</h2>
        </div>
        <div>
          <SimpleTable>
            <template #head>
              <th v-for="name in boneAttributesHeader">{{ name }}</th>
            </template>
            <template #body>
              <tr v-for="row in attributeFiltered(pair[1])">
                <template v-for="attribute in boneAttributesTable">
                  <td>{{ row[attribute] }}</td>
                </template>
                <td>
                  <template v-if="(pair[0] != torsos)">
                    <button @click="addBone(pair[0], row.Name)" class="multipleButton">+1</button>
                    <button @click="subtractBone(pair[0], row.Name)" class="multipleButton">-1</button>
                  </template>
                  <template v-else>
                    <button @click="chooseTorso(row.Name)" class="singleButton">Chose</button>
                  </template>
                </td>
              </tr>
            </template>
          </SimpleTable>
        </div>
      </div>

      <div>
        Possible buyers
        <SimpleTable>
          <template #head>
            <th v-for="name in buyerRewardHeaders">{{ name }}</th>
          </template>
          <template #body>
            <template v-for="(row, index) in filteredBuyers" :key="index">
              <tr>
                <td rowspan="2">{{ row["Buyer"] }}</td>
                <td>{{ row["Primary Reward"] }}</td>
                <td>{{ skeletonvalue / itemValues[row["Primary Reward"]] + row["Primary Bonus"] }}</td>
                <td>{{ skeletonvalue + row["Primary Bonus"] * itemValues[row["Primary Reward"]] }}</td>
                <td rowspan="2">total value</td>
              </tr>
              <tr>
                <td>{{ row["Secondary Reward"] }}</td>
                <td>count</td>
                <td>{{ itemValues[row["Secondary Reward"]] }}</td>
              </tr>
            </template>

          </template>
        </SimpleTable>
      </div>
    </div>
    <div id="specialValues">
      <SimpleTable>
        <template #head></template>
        <template #body>
          <tr v-for="pair in summaryData">
            <td>{{ pair['name'] }}</td>
            <td>{{ pair['value'] }}</td>
          </tr>
        </template>
      </SimpleTable>
    </div>
  </div>

</template>
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 2fr 1fr
}

.multipleButton {
  height: 100%;
  width: 50%
}

.singleButton {
  height: 100%;
  width: 100%
}
</style>