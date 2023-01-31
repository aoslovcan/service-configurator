import React, { ChangeEvent, SetStateAction, useEffect } from 'react'
import Form from '../../../common/Form/Form'
import { useForm } from '../../../helpers/customHooks'
import { checkValidation } from '../../../helpers/commonFunction'
import { fromLists } from '../../../types/types'

type UserFormProps = {
  handleFormData: SetStateAction<any>
  formValid: SetStateAction<any>
}

const UserForm = ({ handleFormData, formValid }: UserFormProps) => {
  const initialForm: Record<string, unknown> = {
    nameAndSurname: '',
    emailAddress: '',
    phoneNumber: 0,
    note: '',
  }

  const validations = {
    nameAndSurname: {
      required: {
        value: true,
        message: '',
      },
      minLength: {
        value: 3,
        message: 'Ensure this field has at least 3 characters.',
      },
    },

    emailAddress: {
      required: {
        value: true,
        message: '',
      },

      custom: {
        isValid: ({ emailAddress }: { emailAddress: string }) =>
          checkValidation(emailAddress, 'email'),
        message: 'You have entered an invalid email address!',
      },
    },

    phoneNumber: {
      required: {
        value: true,
        message: '',
      },

      custom: {
        isValid: ({ phoneNumber }: { phoneNumber: string }) =>
          checkValidation(phoneNumber, 'phoneNumber'),
        message: 'You have entered an invalid phone number!',
      },
    },
  }

  const { formData, setFormData, handleChange, isValidForm, formErrors } =
    useForm(
      initialForm,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      validations
    )

  useEffect(() => {
    setFormData({ ...initialForm })
  }, [])

  useEffect(() => {
    handleFormData(formData, 'userData')

    formValid(isValidForm)
  }, [formData, isValidForm])

  const changeInputValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputField: string
  ) => {
    handleChange(inputField)({
      target: {
        value: e.target.value,
      },
    })
  }

  const formDataList: fromLists = [
    {
      id: 0,
      label: 'Ime i prezime',
      formDataLabel: 'nameAndSurname',
      type: 'text',
    },
    {
      id: 1,
      label: 'Email adresa',
      formDataLabel: 'emailAddress',
      type: 'text',
    },
    {
      id: 2,
      label: 'Broj telefona',
      formDataLabel: 'phoneNumber',
      type: 'text',
    },
    {
      id: 3,
      label: 'Napomena (opcionalno)',
      formDataLabel: 'note',
      type: 'textarea',
    },
  ]

  const createElement = (type: string, formDataLabel: string) => {
    const context: any = {
      textarea: {
        element: (
          <textarea onChange={(e) => changeInputValue(e, formDataLabel)} />
        ),
      },
      text: {
        element: (
          <input
            type={type}
            onChange={(e) => changeInputValue(e, formDataLabel)}
          />
        ),
      },
    }

    return context[type].element
  }

  return (
    <Form orientation="column">
      {formDataList.length
        ? formDataList.map(({ label, type, formDataLabel }, i) => (
            <div key={i} className="form-element">
              <div className="column">
                <label>{label}</label>
                {createElement(type, formDataLabel)}
                <span className="validation-msg">
                  {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    formErrors && formErrors[formDataLabel]
                  }
                </span>
              </div>
            </div>
          ))
        : null}
    </Form>
  )
}
export default UserForm
