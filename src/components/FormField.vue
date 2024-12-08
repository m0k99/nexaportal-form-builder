<template>
  <component
    :is="componentType"
    v-bind="field"
    v-model="localValue"
    :has-errors="hasErrors"
  />
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import TextInput from './TextInput.vue';
import NumberInput from './NumberInput.vue';
import SelectInput from './SelectInput.vue';
import CheckboxInput from './CheckboxInput.vue';

const props = defineProps<{
  field: {
    id: string;
    type: 'text' | 'number' | 'select' | 'checkbox';
    placeholder?: string;
    options?: string[];
  };
  hasErrors?: boolean;
  modelValue: string | number | boolean;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number | boolean): void;
}>();

const localValue = computed({
  get: () => props.modelValue,
  set: (value: string | number | boolean) => emit('update:modelValue', value),
});

const componentType = computed(() => {
  const typeMapping: Record<string, any> = {
    text: TextInput,
    number: NumberInput,
    select: SelectInput,
    checkbox: CheckboxInput,
  };
  return typeMapping[props.field.type];
});
</script>
