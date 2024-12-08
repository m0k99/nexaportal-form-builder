<template>
  <div class="mb-4">
    <label
      :for="field.id"
      class="block text-gray-700 text-xs font-bold mb-2"
    >
      {{ field.label }}
    </label>

    <template v-if="field.type === 'text'">
      <input
        :id="field.id"
        type="text"
        v-model="localValue"
        :placeholder="field.placeholder"
        class="shadow bg-[#ffffff] outline-[#CCD6E2] focus:outline-[#7540c0] text-[#95A4B9] appearance-none border rounded-2xl w-full py-3 px-3.5 leading-tight"
        :class="{ 'border-red-500': hasErrors }"
      />
    </template>

    <template v-else-if="field.type === 'number'">
      <input
        :id="field.id"
        type="number"
        v-model.number="localValue"
        :placeholder="field.placeholder"
        class="shadow appearance-none border rounded-2xl w-full py-3 px-3.5 bg-[#ffffff] outline-[#CCD6E2] focus:outline-[#7540c0] text-[#95A4B9] leading-tight"
        :class="{ 'border-red-500': hasErrors }"
      />
    </template>

    <template v-else-if="field.type === 'select'">
      <select
        :id="field.id"
        v-model="localValue"
        class="shadow appearance-none border rounded-2xl w-full py-3 px-3.5 bg-[#ffffff] outline-[#CCD6E2] focus:outline-[#7540c0] text-[#95A4B9] leading-tight"
        :class="{ 'border-red-500': hasErrors }"
      >
        <option
          v-for="option in field.options"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </template>

    <template v-else-if="field.type === 'checkbox'">
      <input
        :id="field.id"
        type="checkbox"
        v-model="localValue"
        class="mr-2 leading-tight"
      />
    </template>

    <p
      v-if="hasErrors"
      class="text-red-500 text-xs italic mt-1"
    >
      {{ errors.join(', ') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { FormFieldSchema } from '@/types/formTypes.d'
import { validateField } from '@/utils/formValidation'

interface Props {
  field: FormFieldSchema
  modelValue: any
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)
const errors = ref<string[]>([])

const hasErrors = computed(() => errors.value.length > 0)

watch(localValue, (newValue) => {
  errors.value = validateField(newValue, props.field.validation)
  emit('update:modelValue', newValue)
})

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue
  errors.value = validateField(newValue, props.field.validation)
})
</script>
