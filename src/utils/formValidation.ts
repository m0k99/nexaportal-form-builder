import type { ValidationRule } from '@/types/formTypes.d'

export function validateField(value: any, rules?: ValidationRule[]): string[] {
  const errors: string[] = []

  if (!rules) return errors

  rules.forEach(rule => {
    switch (rule.type) {
      case 'required':
        if (!value) errors.push(rule.message || 'This field is required')
        break
      case 'minLength':
        if (typeof value === 'string' && value.length < (rule.value as number)) {
          errors.push(rule.message || `Minimum length is ${rule.value}`)
        }
        break
      case 'maxLength':
        if (typeof value === 'string' && value.length > (rule.value as number)) {
          errors.push(rule.message || `Maximum length is ${rule.value}`)
        }
        break
      case 'pattern':
        const regex = new RegExp(rule.value as string)
        if (!regex.test(value)) {
          errors.push(rule.message || 'Invalid format')
        }
        break
    }
  })

  return errors
}
