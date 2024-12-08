<template>
  <input
    :id="id"
    type="text"
    :value="modelValue"
    @input="updateValue"
    :placeholder="placeholder"
    class="shadow bg-[#ffffff] outline-[#CCD6E2] focus:outline-[#7540c0] text-[#95A4B9] appearance-none border rounded-2xl w-full py-3 px-3.5 leading-tight"
    :class="{ 'border-red-500': hasErrors }"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  id: string
  modelValue: string
  placeholder: string
  hasErrors?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

function updateValue(event: Event) {
  const newValue = (event.target as HTMLInputElement).value
  emit('update:modelValue', newValue)
}
</script>
