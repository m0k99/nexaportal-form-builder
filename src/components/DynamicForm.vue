<template>
  <div class="max-w-lg w-full mx-auto mt-10 p-6 bg-white rounded shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center text-[#121A2D]">
      <slot name="title">{{ title }}</slot>
    </h2>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2"> Select Role </label>
      <select
        v-model="selectedRole"
        @change="handleRoleChange"
        class="shadow appearance-none border rounded-2xl text-sm w-full py-3 px-3.5 bg-[#ffffff] outline-[#CCD6E2] focus:outline-[#7540c0] text-[#95A4B9]"
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
        class="w-full px-6 py-4 bg-[#7540c0] text-white font-semibold rounded-2xl font-700 text-sm shadow-md hover:bg-[#5e34a3] hover:shadow-lg transition-all duration-300 ease-in-out"
        :disabled="!isFormValid"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import FormField from './FormField.vue'
import { useFormStore } from '@/stores/formStore'
import type { FormSchema } from '@/types/formTypes.d'

const props = defineProps<{
  schema: FormSchema
  title?: string
}>()

const formStore = useFormStore()
const selectedRole = ref<'Admin' | 'User'>('User')
const formData = reactive<{ [key: string]: any }>({})

onMounted(() => {
  selectedRole.value = formStore.currentRole
})

const handleRoleChange = () => {
  formStore.setRole(selectedRole.value)

  Object.keys(formData).forEach(key => {
    delete formData[key]
  })
}

const visibleFields = computed(() =>
  props.schema.fields.filter((field) => !field.adminOnly || selectedRole.value === 'Admin'),
)

const isFormValid = computed(() => {
  return visibleFields.value.every(
    (field) =>
      formData[field.id] !== undefined && formData[field.id] !== null && formData[field.id] !== '',
  )
})

const submitForm = () => {
  if (isFormValid.value) {
    // Add the current role to the form submission
    const submissionData = {
      ...formData,
      role: selectedRole.value
    }
    formStore.submitForm(submissionData)
  }
}
</script>
