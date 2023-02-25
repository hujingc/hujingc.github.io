<script setup>
const props = defineProps({ head: Array, body: Array })
</script>
<template>
  <table>
    <thead>
      <tr>
        <template v-for="item in props.head">
          <th>{{ item }}</th>
        </template>
        <slot name="head"></slot>
      </tr>
    </thead>
    <tbody>
      <template v-for="item in props.body">
        <tr>
          <td v-for="value in props.head">{{ item[value] }}</td>
        </tr>
      </template>
      <slot name="body"></slot>
    </tbody>
  </table>
</template>