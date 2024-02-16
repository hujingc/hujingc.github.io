<template>
  <div class="container text-center">
    <div>Character sheet</div>
    <button type="button" @click="saveSheet">Save</button>
    <div>
      <label>STR<input v-model.number="baseSTR" type="number" /></label>
      <label>DEX<input v-model.number="baseDEX" type="number" /></label>
      <label>CON<input v-model.number="baseCON" type="number" /></label>
    </div>
    <div>
      <label>INT<input v-model.number="baseINT" type="number" /></label>
      <label>WIS<input v-model.number="baseWIS" type="number" /></label>
      <label>CHA<input v-model.number="baseCHA" type="number" /></label>
    </div>
    Movement Hit Points Hit Dice Armor Class
    <div class="row">
      <div class="col align-items-start">
        <h4>Weapon</h4>
        <div class="form-check">
          <label for="wren">
            <input
              type="radio"
              id="wren"
              name="weapon"
              value="1d6 (+2d6)"
              v-model="weapon"
            />
            Enchanted Spear Wren
          </label>
        </div>
        <div class="form-check">
          <label for="maul">
            <input
              type="radio"
              id="maul"
              name="weapon"
              value="2d6"
              v-model="weapon"
            />
            Maul
          </label>
        </div>
        <div class="form-check">
          <label for="javelin">
            <input
              type="radio"
              id="javelin"
              name="weapon"
              value="1d6"
              v-model="weapon"
            />
            Standard Javelin
          </label>
        </div>
      </div>
      <div class="col">
        <h4>Armor</h4>
      </div>
    </div>

    <div class="row">
      <div class="card col">
        <p class="card-text">{{ rollToHitMessage }}</p>
        <p class="card-text">Roll+Strength modifier+Proficiency modifier</p>
        <button class="btn btn-primary" @click="rollToHit">Roll to hit</button>
      </div>
      <div class="card col">
        <p class="card-text">{{ rollForDamageMessage }}</p>
        <p class="card-text">Roll({{ weapon }})+</p>
        <button class="btn btn-primary" @click="rollForDamage">
          Roll for damage
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
let toHit = ref(0);
let forDamage = ref(0);
let baseSTR = ref(0);
let baseDEX = ref(0);
let baseCON = ref(0);
let baseINT = ref(0);
let baseWIS = ref(0);
let baseCHA = ref(0);
let weapon = ref("2d6");
let all = [baseSTR, baseDEX, baseCON, baseINT, baseWIS, baseCHA];

updateFromStorage();

function updateFromStorage() {
  let storage = window.localStorage.getItem("dndCharacter");
  let parsed = storage ? JSON.parse(storage) : [];
  for (const stat in parsed) {
    all[stat].value = parsed[stat];
  }
}
const rollToHitMessage = ref("");
const rollForDamageMessage = ref("");
function rollToHit() {
  toHit.value = d20();
  rollToHitMessage.value = `${toHit.value} + 4 + 5=${9 + toHit.value}`;
}

function rollForDamage() {
  forDamage.value = Math.floor(Math.random() * 20) + 1;
  rollToHitMessage.value = `${toHit.value} + 4 + 5=${9 + toHit.value}`;
}

function d20() {
  return Math.floor(Math.random() * 20) + 1;
}

function saveSheet() {
  let toSave = [];
  for (const stat of all) {
    console.log(stat.value);
    toSave.push(stat.value);
  }
  window.localStorage.setItem("dndCharacter", JSON.stringify(toSave));
  updateFromStorage();
}
</script>
