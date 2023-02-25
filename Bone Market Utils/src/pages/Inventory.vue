<script setup>
import { allBonesTypes, allBonesData, extraBoneNames } from '../components/boneConstData.js'
import SimpleTable from '../components/SimpleTable.vue'
import prevInv from '../datasets/sampleInventory.json'

// Get and transform stored data
// parsed = array of objects, object = {item: Name, count: string/number }
// extractedBones = single object, key: value = Name: count 
let storage = window.localStorage.getItem('boneInventory')
let parsed = storage ? JSON.parse(storage)._value : prevInv

const extractedBones = transformData(parsed)

let limitedBoneData = new Map()
let boneData = new Array()
allBonesTypes.forEach((name, index) => limitedBoneData.set(name, allBonesData[index]))
for (let mappair of limitedBoneData) {
  let clean = []
  mappair[1].forEach(obj => extractedBones[obj.Name] ? clean.push(pick(obj, "Name", "Count", "Echo Value Held")) : '')
  mappair[1] = clean
  boneData.push(mappair)
}

function pick(obj, ...props) {
  obj["Count"] = extractedBones[obj.Name]
  obj["Echo Value Held"] = (obj["Penny Value"] * obj["Count"]) / 100;
  return props.reduce(function (result, prop) {
    result[prop] = obj[prop];
    return result;
  }, {});
}

function transformData(originalData) {
  let result = {}
  originalData.forEach(info => result[info.item] = info.count)
  return result
}

</script>
<template>
  <div class="flex-container">
    <div class="item" v-for="dataSet in boneData">
      <h2>{{ dataSet[0] }}</h2>
      <SimpleTable :body="dataSet[1]" :head="['Name', 'Count', 'Echo Value Held']" />
    </div>
    <div class="item">
      <h2>Other Osteology</h2>
      <SimpleTable>
        <template #head>
          <th>Item</th>
          <th>Count</th>
          <th>Echo Value Held</th>
        </template>
        <template #body>
          <tr v-for="name in extraBoneNames">
            <template v-if="extractedBones[name]">
              <td>{{ name }}</td>
              <td>{{ extractedBones[name] }}</td>
              <td v-if="name == 'Bone Fragments'">
                {{ (extractedBones[name] / 100) }}
              </td>
              <td v-else>{{ (extractedBones[name] * 10) / 100 }}</td>
            </template>
          </tr>
        </template>
      </SimpleTable>
    </div>
  </div>

</template>