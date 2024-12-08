<template>
  <div class="min-h-screen bg-[#f5f2f7] py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
      ></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <DynamicForm :schema="formSchema" title="Register Form" />

        <div v-if="formStore.currentRole === 'Admin'" class="mt-6">
          <h3 class="text-xl font-bold mb-4">Submission History</h3>
          <JsonViewer :value="formStore.getSubmissionHistory()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DynamicForm from '@/components/DynamicForm.vue'
import { useFormStore } from '@/stores/formStore'
import type { FormSchema } from '@/types/formTypes.d'
import {JsonViewer} from "vue3-json-viewer"

import "vue3-json-viewer/dist/index.css";

const formStore = useFormStore()

const formSchema: FormSchema = {
  fields: [
    {
      id: 'fullName',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      validation: [
        { type: 'required', message: 'Name is required' },
        { type: 'minLength', value: 2, message: 'Name must be at least 2 characters' },
      ],
    },
    {
      id: 'email',
      type: 'text',
      label: 'Email',
      placeholder: 'Enter your email',
      validation: [
        { type: 'required', message: 'Email is required' },
        {
          type: 'pattern',
          value: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
          message: 'Invalid email format',
        },
      ],
    },
    {
      id: 'department',
      type: 'select',
      label: 'Department',
      options: ['HR', 'IT', 'Finance', 'Marketing'],
      validation: [{ type: 'required', message: 'Department is required' }],
    },
    {
      id: 'adminCode',
      type: 'text',
      label: 'Admin Code',
      placeholder: 'Enter admin code',
      adminOnly: true,
      validation: [{ type: 'required', message: 'Admin code is required' }],
    },
  ],
}
</script>
