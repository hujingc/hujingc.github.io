<script setup>
// Components
import SimpleTable from '../components/SimpleTable.vue';
// Imports & Data
import { ref, reactive, computed } from 'vue'
import variableOptions from '../datasets/solver.json'

let options = reactive([])
let result = ref("")
const { Torso, Skull, Appendage, Adjustment, Declaration, Embellishment, Buyer } = variableOptions
const items = [Torso, Skull, Appendage, Adjustment, Declaration, Embellishment, Buyer]

const base = "pipenv run bone_market_solver "
const blacklist = "--blacklist "
const buyer = "-b"
const timeShadowy = "--time-limit 60 --shadowy 302"
const fluctuations = "--bone-market-fluctuations "
const mania = "--zoological-mania "
let maniaOption = reactive('')

function processResult() {

  result.value = base + timeShadowy + mania + maniaOption
  console.log(options.join(""))
  return result
}
function setMania(option) {
  options.push(option)
  maniaOption = option
}
</script>

<template>
  {{ options }}
  {{ result }}
  <button @click="setMania('antiquity')">Antiquity</button>
  <button @click="setMania('amalgamy')">Amalgamy</button>
  <button @click="setMania('menace')">Menace</button>
  <button @click="processResult">Process result</button>
  <div class="container">
    <div class="item" v-for="itemList in items">
      <h2>{{ itemList[0].split('.')[0] }}</h2>
      <SimpleTable>
        <template #head>
          <th>Item</th>
        </template>
        <template #body>
          <tr v-for="value in itemList">
            <button @click="options.push(value)">{{ value }}</button>
          </tr>
        </template>
      </SimpleTable>
    </div>
  </div>

</template>