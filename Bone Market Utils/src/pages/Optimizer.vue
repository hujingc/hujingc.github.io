<script setup>
// Imports & Data
// ref for primitive (str,bool,num) + use .value, reactive for object
import { ref, reactive, computed } from 'vue'
import variableOptions from '../datasets/solver.json'

let result = ref("")
const { Torso, Skull, Appendage, Adjustment, Declaration, Embellishment, Buyer, OccasionalBuyer } = variableOptions
const items = { "Skull": Skull, "Appendage": Appendage, "Declaration": Declaration, "Buyer": Buyer }
const exclusions = { "Skull": Skull, "Adjustment": Adjustment, "Embellishment": Embellishment }

// Single (Radio)
let exhaustionLimit = ref('4')
let timeLimit = ref('60')
let shadowyLevel = ref('302')

let preferredQuality = ref('')
let preferredSkeletonType = ref('')
let currentBuyer = ref('')
let currentDiplomat = ref('')
let torsoPick = ref('')

// Multi (Checkbox)
let selectedOptions = reactive({ "Skull": [], "Appendage": [], "Adjustment": [], "Declaration": [], "Embellishment": [], "Buyer": [] })
let excludedOptions = reactive({ "Skull": [], "Appendage": [], "Adjustment": [], "Declaration": [], "Embellishment": [], "Buyer": [] })

// Button functions
function processResult() {
  let exhaustion = exhaustionLimit.value ? ` --maximum-exhaustion ${exhaustionLimit.value}` : ""
  let time = timeLimit.value ? ` --time-limit ${timeLimit.value}` : ""
  let shadowy = shadowyLevel.value ? ` --shadowy ${shadowyLevel.value}` : ""

  let fluctuation = preferredQuality.value ? ` --bone-market-fluctuations ${preferredQuality.value}` : ""
  let mania = preferredSkeletonType.value ? ` --zoological-mania ${preferredSkeletonType.value}` : ""
  let occasionalBuyer = currentBuyer.value ? ` --occasional-buyer ${currentBuyer.value}` : ""
  let diplomat = currentDiplomat.value ? ` --diplomat-fascination ${currentDiplomat.value}` : ""

  // Proces Blacklist options
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
  for (let option in excludedOptions) {
    if (excludedOptions[option].length) {
      massBlacklist.push(...excludedOptions[option])
    }
  }
  let blacklist = (torsoBlacklist.length || massBlacklist.length) ? `--blacklist ${torsoBlacklist.join(" ")} ${massBlacklist.join(" ")}` : ""

  // Final Result
  result.value = `pipenv run bone_market_solver${exhaustion}${time}${shadowy}${fluctuation}${mania}${occasionalBuyer}${diplomat}${blacklist}`
}

function clearSelection() {
  preferredQuality.value = null
  result.value = ''
  for (let option in selectedOptions) {
    selectedOptions[option] = []
  }
  for (let option in excludedOptions) {
    excludedOptions[option] = []
  }
}
function copyResult() {
  navigator.clipboard.writeText(result.value).then(() => {
    console.log('copied')
  }, () => {
    console.log('copy failed')
  });
}
</script>

<template>
  <blockquote>{{ result }}</blockquote>
  <button @click="processResult">Process Result</button>
  <button @click="clearSelection">Clear Selections</button>
  <button v-if="result" @click="copyResult">Copy Result</button>

  <div>Instruction: if anything is selected in a section, the rest will be blacklisted</div>
  <section>
    <h2>Basic Options</h2>
    <label>
      Maximum Exhaustion
      <input v-model="exhaustionLimit" />
    </label>
    <label>
      Time Limit
      <input v-model="timeLimit" />
    </label>
    <label>
      Player Shadowy
      <input v-model="shadowyLevel" />
    </label>
  </section>
  <section>
    <h2>Current Manias</h2>
    <div class="flex-container">
      <div class="item">
        <h3>Preferred Quality</h3>
        <div v-for="mania in ['antiquity', 'amalgamy', 'menace']">
          <input type="radio" :id="`mania_${mania}`" :value="mania" v-model="preferredQuality" />
          <label :for="`mania_${mania}`">{{ mania.charAt(0).toUpperCase() + mania.slice(1) }}</label>
        </div>
      </div>
      <div class="item">
        <h3>Preferred Skeleton Type</h3>
        <div v-for="mania in Declaration">
          <input type="radio" :id="`mania_${mania}`" :value="mania.split('.')[1].toLowerCase()"
            v-model="preferredSkeletonType" />
          <label :for="`mania_${mania}`">{{ mania.split('.')[1].toLowerCase() }}</label>
        </div>
      </div>
      <div class="item">
        <h3>Occasional Buyer</h3>
        <div v-for="mania in OccasionalBuyer">
          <input type="radio" :id="`oBuyer_${mania}`" :value="mania" v-model="currentBuyer" />
          <label :for="`oBuyer_${mania}`">{{ mania.replaceAll('_', ' ') }}</label>
        </div>
      </div>
      <div class="item">
        <h3>Diplomat's Current Fascination</h3>
        <div
          v-for="mania in ['amalgamy', 'antiquity', 'menace', 'amphibian', 'bird', 'fish', 'insect', 'legs', 'reptile', 'skulls', 'spider']">
          <input type="radio" :id="`diplomat_${mania}`" :value="mania" v-model="currentDiplomat" />
          <label :for="`diplomat_${mania}`">{{ mania }}</label>
        </div>
      </div>
    </div>
  </section>
  <section>
    <h2>Used Options</h2>
    <div class="flex-container">
      <div class="item">
        <h3>Torso</h3>
        <div v-for="torso in Torso">
          <input type="radio" :id="`torso_${torso.split('.')[1]}`" :value="torso" v-model="torsoPick" />
          <label :for="`torso_${torso.split('.')[1]}`">
            {{ torso.split('.')[1].replaceAll("_", " ").toLowerCase() }}
          </label>
        </div>
      </div>

      <div class="item" v-for="itemList in items">
        <h3>{{ itemList[0].split('.')[0] }}</h3>
        <div v-for="value in itemList">
          <input :id="`selected_${value}`" type="checkbox" :value="value"
            v-model="selectedOptions[value.split('.')[0]]" />
          <label :for="`selected_${value}`">{{ value.split('.')[1].replaceAll("_", " ").toLowerCase() }}</label>
        </div>
      </div>
    </div>
  </section>
  <br />
  <section>
    <h2>Excluded Options</h2>
    <div class="flex-container">
      <div v-for="itemList in exclusions" class="item">
        <h3>{{ itemList[0].split('.')[0] }}</h3>
        <div v-for="value in itemList">
          <input :id="`excluded_${value}`" type="checkbox" :value="value"
            v-model="excludedOptions[value.split('.')[0]]" />
          <label :for="`excluded_${value}`">{{ value.split('.')[1].replaceAll("_", " ").toLowerCase() }}</label>
        </div>
      </div>
    </div>
  </section>


</template>
<style>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

h2 {
  margin-bottom: 0px;
}

h3 {
  margin-top: 0px;
}
</style>