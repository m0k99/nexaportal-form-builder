import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { FormSubmission } from '@/types/formTypes.d'

export const useFormStore = defineStore('form', () => {
  // State
  const submissions = ref<FormSubmission[]>([])
  const currentRole = ref<'Admin' | 'User'>('User')

  // Actions
  function submitForm(formData: FormSubmission) {
    console.log('Form Submitted:', formData)
    submissions.value.push(formData)
  }

  function setRole(role: 'Admin' | 'User') {
    console.log(`Role changed to: ${role}`)
    currentRole.value = role
  }

  // Computed
  const submissionCount = computed(() => submissions.value.length)

  // Getter
  function getSubmissionHistory() {
    return submissions.value
  }

  // Expose state and methods
  return {
    submissions,
    currentRole,
    submitForm,
    setRole,
    submissionCount,
    getSubmissionHistory
  }
})
