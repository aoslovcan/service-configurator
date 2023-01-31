import React, { ReactNode } from 'react'

type FormInputListProps = {
  id: string
  inputType: string
  handleButtonClick: (data: React.MouseEvent<HTMLInputElement>) => void
  inputValue: string | number | undefined
  labelValue: string | ReactNode | number | undefined
  classNames?: string
  additionalStyle?: string
  inputName?: string
}

const FormInput = ({
  id,
  inputType,
  handleButtonClick,
  inputValue,
  labelValue,
  classNames = '',
  additionalStyle = '',
  inputName = '',
}: FormInputListProps) => {
  return (
    <div key={id} className={`form-group ${additionalStyle}`}>
      <input
        name={inputName}
        className={`${classNames}`}
        onClick={(e) => handleButtonClick(e)}
        type={inputType}
        id={id}
        value={inputValue}
      />
      <label htmlFor={id}>{labelValue}</label>
    </div>
  )
}

export default FormInput
