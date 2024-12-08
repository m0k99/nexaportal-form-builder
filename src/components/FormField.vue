<template>
  <div class="mb-4">
    <label :for="field.id">
      {{ field.label }}
    </label>
    <!--    //TODO make this part dynamic component -->
    <template v-if="field.type === 'text'">
      <input :id="field.id" type="text" v-model="localValue" :placeholder="field.placeholder" />
    </template>

    <template v-else-if="field.type === 'number'">
      <input
        :id="field.id"
        type="number"
        v-model.number="localValue"
        :placeholder="field.placeholder"
      />
    </template>

    <template v-else-if="field.type === 'select'">
      <select :id="field.id" v-model="localValue">
        <option v-for="option in field.options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </template>

    <template v-else-if="field.type === 'checkbox'">
      <input :id="field.id" type="checkbox" v-model="localValue" />
    </template>

    <p v-if="hasErrors">
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

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue
    errors.value = validateField(newValue, props.field.validation)
  },
)
</script>
