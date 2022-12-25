<script setup>
// Imports & Data
// ref for primitive (str,bool,num) + use .value, reactive for object
import { ref, reactive, computed } from 'vue'
import variableOptions from '../datasets/solver.json'

let result = ref("")
const { Torso, Skull, Appendage, Adjustment, Declaration, Embellishment, Buyer } = variableOptions
const items = { "Skull": Skull, "Appendage": Appendage, "Declaration": Declaration, "Buyer": Buyer }
const exclusions = { "Skull": Skull, "Adjustment": Adjustment, "Embellishment": Embellishment }
// Single (Radio)
let marketFluctuation = ref('')
let zoologicalMania = ref('')
let torsoPick = ref('')

// Multi (Checkbox)
let selectedOptions = reactive({ "Skull": [], "Appendage": [], "Adjustment": [], "Declaration": [], "Embellishment": [], "Buyer": [] })

// Button functions
function processResult() {
  let mania = zoologicalMania.value ? `--zoological-mania ${zoologicalMania.value}` : ""
  let fluctuation = marketFluctuation.value ? `--bone-market-fluctuations ${marketFluctuation.value}` : ""
  let torsoBlacklist = []
  let massBlacklist = []

  if (torsoPick.value != '') {
    let torsoAll = [...Torso]
    let targetIndex = torsoAll.indexOf(torsoPick.value)
    torsoAll.splice(targetIndex, 1)
    torsoBlacklist.push(...torsoAll)
  }
  for (let option in selectedOptions) {
    if (selectedOptions[option].length) {
      let excludedItems = [...items[option]].filter(item => !(selectedOptions[option].includes(item)))
      massBlacklist.push(...excludedItems)
    }
  }

  let blacklist = (torsoBlacklist.length || massBlacklist.length) ? `--blacklist ${torsoBlacklist.join(" ")} ${massBlacklist.join(" ")}` : ""

  result.value = `pipenv run bone_market_solver --maximum-exhaustion 4 --time-limit 60 --shadowy 302
   ${fluctuation} ${mania} ${blacklist}`
}

function clearSelection() {
  marketFluctuation.value = null
  for (let option in selectedOptions) {
    selectedOptions[option] = []
  }
}
</script>

<template>
  <blockquote>{{ result }}</blockquote>
  <button @click="processResult">Process Result</button>
  <button @click="clearSelection">Clear Selections</button>
  <div>Instruction: if anything is selected in a section, the rest will be blacklisted</div>
  <div class="container">
    <div class="item">
      <h2>Current Manias</h2>
      <div v-for="mania in ['antiquity', 'amalgamy', 'menace']">
        <input type="radio" :id="`mania_${mania}`" :value="mania" v-model="marketFluctuation" />
        <label :for="`mania_${mania}`">{{ mania.charAt(0).toUpperCase() + mania.slice(1) }}</label>
      </div>
      <br />
      <div v-for="mania in Declaration">
        <input type="radio" :id="`mania_${mania}`" :value="mania.split('.')[1].toLowerCase()"
          v-model="zoologicalMania" />
        <label :for="`mania_${mania}`">{{ mania.split('.')[1].toLowerCase() }}</label>
      </div>
    </div>
    <div class="item">
      <h2>Torso</h2>
      <div v-for="torso in Torso">
        <input type="radio" :id="`torso_${torso.split('.')[1]}`" :value="torso" v-model="torsoPick" />
        <label :for="`torso_${torso.split('.')[1]}`">
          {{ torso.split('.')[1].replaceAll("_", " ").toLowerCase() }}
        </label>
      </div>
    </div>

    <div class="item" v-for="itemList in items">
      <h2>{{ itemList[0].split('.')[0] }}</h2>
      <div v-for="value in itemList">
        <input :id="value" type="checkbox" :value="value" v-model="selectedOptions[value.split('.')[0]]" />
        <label :for="value">{{ value.split('.')[1].replaceAll("_", " ").toLowerCase() }}</label>
      </div>
    </div>
  </div>
</template>
<style>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>