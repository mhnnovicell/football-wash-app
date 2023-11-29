<template>
  <div class="flex flex-col w-full h-full">
    <v-select
      :options="data"
      label="name"
      v-model="selectedOption"
      multiple
      class="bg-white rounded-md shadow-md text-black"
    ></v-select>

    <div class="flex w-full h-full">
      <a
        v-for="(option, optionIdx) in selectedOption"
        :key="optionIdx"
        href="#"
        class="flex max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ option.name }}
        </h5>
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
:root {
  --vs-selected-bg: yellow;
  --vs-selected-color: var(--vs-colors--dark);
  --vs-selected-border-color: var(--vs-border-color);
  --vs-selected-border-style: var(--vs-border-style);
  --vs-selected-border-width: var(--vs-border-width);
}
</style>
