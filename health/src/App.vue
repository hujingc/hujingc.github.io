<template>
  <div>
    <h2>Task List for {{ date }}</h2>

    <ul>
      <li v-for="taskId in taskIds" :key="taskId">
        <input type="checkbox" :id="taskId" :checked="getTaskStatus(taskId)" @change="handleCheckboxChange(taskId)" />
        <label :for="taskId">{{ taskId }}</label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useIndexedDB } from './indexedDB';

const date = ref('2024-02-16');
const taskIds = ['task1', 'task2', 'task3']; // Add more task IDs as needed

const { loadedTaskStatus, loadInitialTaskStatus, updateTaskStatus } = useIndexedDB();

onMounted(() => {
  // Example: Load initial task status from IndexedDB
  loadInitialTaskStatus(date.value);
});

const getTaskStatus = (taskId) => {
  return loadedTaskStatus.value ? loadedTaskStatus.value[taskId] : false;
};

const handleCheckboxChange = (taskId) => {
  const isChecked = getTaskStatus(taskId);
  updateTaskStatus(date.value, taskId, !isChecked);
};
</script>
