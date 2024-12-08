import { defineStore } from 'pinia'
import type { FormSubmission } from '@/types/formTypes.d'

export const useFormStore = defineStore('form', {
  state: () => ({
    submissions: [] as FormSubmission[],
    currentRole: 'User' as 'Admin' | 'User'
  }),
  actions: {
    submitForm(formData: FormSubmission) {
      console.log('Form Submitted:', formData)
      this.submissions.push(formData)
    },
    setRole(role: 'Admin' | 'User') {
      this.currentRole = role
    }
  }
})
