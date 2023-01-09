<script setup>
import { allBonesTypes, allBonesData, extraBoneNames } from '../components/boneConstData.js'
import SimpleTable from '../components/SimpleTable.vue'
import prevInv from '../datasets/sampleInventory.json'
// Prepare reference dataset
let typeData = new Map();
allBonesTypes.forEach((category, index) => typeData.set(category, allBonesData[index]));

// Extract other osteology items
let fullBoneData = new Array();
allBonesData.forEach(dataset => fullBoneData.push(...dataset))
let boneNames = new Array();
fullBoneData.forEach(boneObject => boneNames.push(boneObject.Name))

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

const extractedBones = transformData(parsed)
const extraBoneItems = parsed.filter(i => extraBoneNames.includes(i.item))

function transformData(originalData) {
  let result = {}
  originalData.forEach(info => result[info.item] = info.count)
  return result
}

</script>
<template>
  <div class="flex-container">
    <div class="item" v-for="dataSet in typeData">
      <h2>{{ dataSet[0] }}</h2>
      <SimpleTable>
        <template #head>
          <th>Item</th>
          <th>Count</th>
        </template>
        <template #body>
          <tr v-for="specificData in dataSet[1]">
            <td v-if="extractedBones[specificData.Name]">{{ specificData.Name }}</td>
            <td v-if="extractedBones[specificData.Name]">{{ extractedBones[specificData.Name] }}</td>
          </tr>
        </template>
      </SimpleTable>
    </div>
    <div class="item">
      <h2>Other Osteology</h2>
      <SimpleTable>
        <template #head>
          <th>Item</th>
          <th>Count</th>
        </template>
        <template #body>
          <tr v-for="row in extraBoneItems">
            <template v-if="row['count']">
              <td>{{ row["item"] }}</td>
              <td>{{ row["count"] }}</td>
            </template>
          </tr>
        </template>
      </SimpleTable>
    </div>
  </div>

</template>