<template>
  <div class="container text-center">
    <div>Character sheet</div>
    <label>
      STR
      <input />
    </label>
    <label>
      DEX
      <input />
    </label>

    <label>CON<input /></label>
    <label>INT<input /></label>
    <label>WIS<input /></label>
    <label>CHA<input /></label>
    Movement Hit Points Hit Dice Armor Class
    <div class="row">
      <h3>Equipped</h3>
      <h4>Weapon</h4>
      <h4>Armor</h4>
    </div>

    <div class="row">
      <div class="card col">
        <p class="card-text">{{ rollToHitMessage }}</p>
        <button class="btn btn-primary" @click="rollToHit">Roll to hit</button>
      </div>
      <div class="card col">
        <p class="card-text">hi</p>
        <button class="btn btn-primary">Roll for damage</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
let toHit = ref(0);
const rollToHitMessage = ref("Roll+Strength modifier+Proficiency modifier");
function rollToHit() {
  toHit.value = Math.floor(Math.random() * 20) + 1;
  rollToHitMessage.value = `${toHit.value} + 4 + 5=${9 + toHit.value}`;
}
</script>
