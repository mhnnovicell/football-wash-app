<template>
  <div class="flex flex-col w-full h-full">
    <div
      class="z-10 relative bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
      <div
        v-for="option in filteredOptions"
        :key="option"
        @click="selectOption(option)"
        class="w-full px-3 py-2 text-black border-t cursor-pointer hover:bg-gray-200"
      >
        <input
          type="search"
          v-model="search"
          class="w-full px-3 py-2 text-black border rounded-md outline-none focus:shadow-outline"
          placeholder="Search..."
        />
        {{ option }}
      </div>
    </div>

    <div class="flex flex-col w-full h-full">
      <a
        href="#"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Noteworthy technology acquisitions 2021
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </a>
    </div>

    <label
      for="countries"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Select an option</label
    >
    <select
      id="countries"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <input
        type="search"
        v-model="search"
        class="w-full px-3 py-2 text-black border rounded-md outline-none focus:shadow-outline"
        placeholder="Search..."
      />
      <option
        @click="selectOption(option)"
        v-for="option in filteredOptions"
        :key="option"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '../supabase';
import { computed, ref } from 'vue';

const data = ref([]);
const selectedOption = ref(null);
const search = ref('');

await supabase
  .from('players')
  .select('*')
  .then((result: any) => {
    data.value = result.data;
  });

const filteredOptions = computed(() => {
  if (!search.value) return data.value;
  return data.value.filter((option: any) =>
    option.toLowerCase().includes(search.value.toLowerCase())
  );
});

const selectOption = (option: any) => {
  selectedOption.value = option;
  search.value = option;
};
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
