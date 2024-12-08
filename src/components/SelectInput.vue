<template>
  <select
    :id="id"
    :value="modelValue"
    @change="updateValue"
    class="shadow appearance-none border rounded-2xl w-full py-3 px-3.5 bg-[#ffffff] outline-[#CCD6E2] focus:outline-[#7540c0] text-[#95A4B9] leading-tight"
    :class="{ 'border-red-500': hasErrors }"
  >
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  id: string
  modelValue: string
  options: string[]
  hasErrors?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

function updateValue(event: Event) {
  const newValue = (event.target as HTMLSelectElement).value
  emit('update:modelValue', newValue)
}
</script>
