// indexedDB.ts
import { ref, onMounted } from 'vue';

const dbName = 'TaskTrackingDB';
const dbVersion = 1;
const request = indexedDB.open(dbName, dbVersion);

const loadedTaskStatus = ref(null);

export const useIndexedDB = () => {
  const openDB = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      request.onupgradeneeded = (event) => {
        const db = request.result;
        // Create the "tasks" object store if it doesn't exist
        if (!db.objectStoreNames.contains('tasks')) {
          db.createObjectStore('tasks', { keyPath: 'date' });
        }
      };

      request.onsuccess = () => {
        const db = request.result;
        resolve(db);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  };

  const initDB = async () => {
    try {
      const db = await openDB();
      // Initialize or check your database structure here
    } catch (error) {
      console.error('Error opening the database: ', error);
    }
  };

  const loadInitialTaskStatus = (date: string) => {
    openDB()
      .then((db) => {
        // Start a new transaction
        const transaction = db.transaction(['tasks'], 'readwrite');

        // Get the object store
        const taskStore = transaction.objectStore('tasks');

        // Rest of the load initial task status logic...
      })
      .catch((error) => {
        console.error('Error opening the database: ', error);
      });
  };

  onMounted(() => {
    // Example: Load initial task status from IndexedDB
    initDB();
  });

  const updateTaskStatus = (date: string, taskId: string, isChecked: boolean) => {
    openDB()
      .then((db) => {
        // Rest of the update logic...
      })
      .catch((error) => {
        console.error('Error opening the database: ', error);
      });
  };

  return {
    loadedTaskStatus,
    loadInitialTaskStatus,
    updateTaskStatus,
  };
};
