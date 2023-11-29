<template>
  <div class="flex flex-col w-full h-full">
    <v-select
      :options="data"
      label="name"
      v-model="selectedOption"
      multiple
      class="bg-white rounded-md shadow-md text-black mb-6"
    ></v-select>

    <div class="flex w-full h-full" v-if="selectedOption">
      <a
        v-for="(option, optionIdx) in selectedOption"
        :key="optionIdx"
        href="#"
        class="flex flex-col max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mr-6"
      >
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ option.name }}
        </h5>
        <div class="flex items-center mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            v-model="option.shouldWash"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-checkbox"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Skal vaske</label
          >
        </div>
        <div class="flex items-center mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            v-model="option.hasAlreadyWashed"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-checkbox"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Har allerede vasket</label
          >
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '../supabase';
import { computed, ref } from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

const data = ref([]);
const selectedOption = ref(null);
const search = ref('');

await supabase
  .from('players')
  .select('*')
  .then((result: any) => {
    data.value = result.data;
  });
</script>

<style>
.vs__selected {
  @apply bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300;
}

.vs__deselect > svg {
  @apply fill-white;
}
</style>
