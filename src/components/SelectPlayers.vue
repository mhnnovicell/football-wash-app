<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex flex-col w-full h-full">
      <v-select
        :options="data"
        label="name"
        v-model="selectedOption"
        multiple
      ></v-select>

      <a
        v-for="(option, optionIdx) in selectedOption"
        :key="optionIdx"
        href="#"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ option.name }}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
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

<style scoped>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #dfe5fb;
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}
</style>
