<script setup>
import { ref } from 'vue'
let userData = ''
let jsonResult = ref(new Array())

function processData(data) {
  console.log('getting data')
  const parser = new DOMParser();
  const doc3 = parser.parseFromString(data, "text/html");
  doc3.querySelectorAll('img').forEach(item => jsonResult.value.push(dataExtractor(item, doc3)))

  console.log('complete')
}
function dataExtractor(val, parser) {
  let initial = val.alt.split(';')[0]
  let splitted = initial.split(' × ')
  if (splitted[0] == 'Nodule of Warm Amber') {
    let amber = parser.querySelector('[data-quality-id="328"]')
    return { item: "Nodule of Warm Amber", count: amber.children[1].firstChild.data }
  }
  else {
    return { item: splitted[0], count: splitted[1] }
  }
}
function save(option) {
  if (option == "browser") {
    window.localStorage.setItem('boneInventory', JSON.stringify(jsonResult));
    console.log('data saved')
  }
  else {
    let textFile = null
    let text = document.getElementById('jsonOutputPreview').textContent
    let data = new Blob([text], { type: 'text/plain' });
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);

    let link = document.getElementById('localSave');
    link.href = textFile
    link.style.display = "block"
    let wrapperButton = document.getElementById('wrapperButton');
    wrapperButton.style.display = "inline-block"
    let replace = document.getElementById('saveButtonLocal');
    replace.style.display = "none"
  }
}
</script>

<template>
  <label for="userData">Bone Data Parser</label>
  <textarea v-model="userData" id="userData" placeholder="FL html here" />
  <button @click="processData(userData)">Get JSON</button>

  <h2>JSON Output</h2>
  <button @click="save('browser')">Save data to browser</button>
  <button id="saveButtonLocal" @click="save('local')">Save data to local</button>

  <button id="wrapperButton"><a download='sampleInventory.json' id="localSave">Download</a></button>

  <p id="jsonOutputPreview">{{ jsonResult }}</p>
</template>
<style scoped>
button>a,
#wrapperButton {
  display: none;
  color: white
}
</style>