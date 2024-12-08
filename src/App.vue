<template>
  <div class="min-h-screen bg-[#f5f2f7] py-6 flex flex-col justify-center sm:py-12">
    <DynamicForm :schema="formSchema" title="Register Form" />
  </div>
</template>

<script setup lang="ts">
import DynamicForm from '@/components/DynamicForm.vue'
import type { FormSchema } from '@/types/formTypes.d'

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
