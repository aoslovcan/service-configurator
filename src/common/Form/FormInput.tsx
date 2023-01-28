import React from 'react'

type FormInputListProps = {
  id: string
  inputType: string
  handleButtonClick: (data: string) => void
  inputValue: string | number | undefined
}

const FormInput = ({
  id,
  inputType,
  handleButtonClick,
  inputValue,
}: FormInputListProps) => {
  return (
    <div key={id} className="form-group">
      <input
        onClick={(e) => handleButtonClick((e.target as HTMLInputElement).value)}
        type={inputType}
        id="carModel"
        value={inputValue}
      />
      <label htmlFor="html">{inputValue}</label>
    </div>
  )
}

export default FormInput
