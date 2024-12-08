export type FieldType = 'text' | 'number' | 'select' | 'checkbox'

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern'
  value?: string | number
  message: string
}

export interface FormFieldSchema {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  options?: string[]
  validation?: ValidationRule[]
  adminOnly?: boolean
}

export interface FormSchema {
  fields: FormFieldSchema[]
  role?: 'Admin' | 'User'
}

export interface FormSubmission {
  [key: string]: string | number | boolean
}
