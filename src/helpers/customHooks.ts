import { useEffect, useRef, useState } from 'react'

export const useFocus = () => {
  const focusElement = useRef<HTMLInputElement>(null)

  useEffect(() => {
    focusElement.current?.focus()
  })

  return focusElement
}

type ValidationType = {
  string: {
    required?: {
      value: boolean
      message: string
    }
  }
}

export const useForm = (
  initialState: Record<string, unknown>,
  validations: ValidationType
) => {
  const [formData, setFormData] = useState(initialState || {})
  const [isValidForm, setIsValidForm] = useState(true)
  const [formErrors, setFormErrors] = useState({})

  const checkValidation = () => {
    if (!validations) {
      return
    }

    const newErrors = Object.entries(validations).reduce(
      (errors, [fieldName, validation]) => {
        const value = formData[fieldName]

        if (validation?.required?.value && !value) {
          return {
            ...errors,
            [fieldName]: validation?.required?.message,
          }
        }
        return errors
      },
      {}
    )

    if (Object.keys(newErrors).length) {
      setFormErrors({ ...newErrors })
      setIsValidForm(false)
      return
    }

    setFormErrors({})
    setIsValidForm(true)
  }

  useEffect(() => {
    checkValidation()
  }, [formData])

  const handleChange =
    (formField: string) =>
    ({ target }: any) => {
      const value = target.value

      setFormData({
        ...formData,
        [formField]: value,
      })
    }

  return {
    formData,
    formErrors,
    isValidForm,
    setFormData,
    handleChange,
  }
}
