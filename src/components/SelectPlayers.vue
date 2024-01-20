<template>
  <div class="flex flex-col w-full h-screen">
    <v-select
      :options="data"
      label="name"
      v-model="selectedOption"
      multiple
      class="mb-6 text-black bg-white rounded-md shadow-md"
      :selectable="isSelectable"
      placeholder="Vælg spillere"
    ></v-select>

    <form
      class="flex flex-col w-full h-full md:flex-row"
      v-if="selectedOption.length >= 1"
    >
      <a
        v-for="(option, optionIdx) in selectedOption"
        :key="optionIdx"
        class="flex flex-col flex-wrap max-w-sm p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow md:mr-6 md:mb-0 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ (option as any).name }}
        </h5>
        <div class="flex items-center my-4">
          <input
            id="default-checkbox"
            type="checkbox"
            v-model="shouldWashClothes"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-checkbox"
            class="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
            >Skal vaske</label
          >
        </div>
        <div class="flex items-center mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            v-model="(option as any).hasAlreadyWashed"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-checkbox"
            class="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
            >Har allerede vasket</label
          >
        </div>
        <p class="flex text-white">Dagens dato:</p>
        <p class="flex text-white">
          {{ (option as any).todaysDate }}
        </p>
      </a>
      <button
        @click.prevent="confirmShirtWash"
        :disabled="dataWasSubmitted"
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Bekræft trøjevask
      </button>
      <div
        id="toast-success"
        class="flex items-center w-full p-4 mt-6 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
        v-if="dataWasSubmitted"
      >
        <a
          @click.prevent="!dataWasSubmitted"
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
            />
          </svg>
          <span class="sr-only">Check icon</span>
        </a>
        <div class="text-sm font-normal ms-3">Item moved successfully.</div>
        <button
          type="button"
          class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-success"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '../supabase';
import { ref } from 'vue';
import 'vue-select/dist/vue-select.css';

const data = ref([] as any[]);
const selectedOption = ref([]);
const shouldWashClothes = ref(false);
const dataWasSubmitted = ref(false);

await supabase
  .from('players')
  .select('*')
  .then((result: any) => {
    data.value = result.data;
  });

const isSelectable = (option: never): boolean => {
  return !selectedOption.value.includes(option);
};

const confirmShirtWash = async () => {
  selectedOption.value.forEach(async (options: any) => {
    if (shouldWashClothes.value) {
      await supabase
        .from('players')
        .update({ hasAlreadyWashed: true })
        .eq('name', options.name)
        .then((response) => {
          console.log('Update successful', response);
          dataWasSubmitted.value = true;
        });
    }
  });
};
</script>

<style>
.vs__selected {
  @apply bg-blue-100 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300;
}

.vs__deselect > svg {
  @apply fill-white;
}
</style>
