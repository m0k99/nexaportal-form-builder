<template>
  <div>
    <h2>Dynamic Form</h2>

    <div class="mb-4">
      <label>
        Select Role
      </label>
      <select
        v-model="selectedRole"
      >
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
    </div>

    <form @submit.prevent="submitForm">
      <FormField
        v-for="field in visibleFields"
        :key="field.id"
        :field="field"
        v-model="formData[field.id]"
        class="mb-4"
      />

      <button
        type="submit"
        :disabled="!isFormValid"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import FormField from './FormField.vue'
import { useFormStore } from '@/stores/formStore'
import type { FormSchema, FormFieldSchema } from '@/types/formTypes.d'

const props = defineProps<{
  schema: FormSchema
}>()

const formStore = useFormStore()
const selectedRole = ref<'Admin' | 'User'>('User')
const formData = reactive<{[key: string]: any}>({})

selectedRole.value = formStore.currentRole

const visibleFields = computed(() =>
  props.schema.fields.filter(field =>
    !field.adminOnly || selectedRole.value === 'Admin'
  )
)

const isFormValid = computed(() => {
  return visibleFields.value.every(field =>
    formData[field.id] !== undefined &&
    formData[field.id] !== null &&
    formData[field.id] !== ''
  )
})

const submitForm = () => {
  if (isFormValid.value) {
    formStore.submitForm(formData)
  }
}
</script>
