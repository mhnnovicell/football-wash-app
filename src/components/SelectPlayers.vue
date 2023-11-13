<template>
  <div class="w-full h-full style-chooser">
    <vSelect :options="data" label="name" :value="data.name" multiple></vSelect>
  </div>
</template>

<script setup lang="ts">
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { supabase } from '../supabase';
import { ref } from 'vue';

const data = ref('');

await supabase
  .from('players')
  .select('*')
  .then((result: any) => {
    data.value = result.data;
  })
  .catch((err: any) => {});
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
