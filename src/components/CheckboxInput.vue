<template>
  <input
    :id="id"
    type="checkbox"
    :checked="modelValue"
    @change="updateValue"
    class="mr-2 leading-tight"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  id: string
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

function updateValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>
