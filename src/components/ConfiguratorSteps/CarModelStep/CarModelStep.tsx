import React from 'react'
import Form from '../../../common/Form/Form'
import carModels from '../../../data/carBrand.json'
import FormInput from '../../../common/Form/FormInput'

type CarModeStepProps = {
  handleButtonClick: (data: string | unknown, name: string) => void
}

const CarModelStep = ({ handleButtonClick }: CarModeStepProps) => {
  const handleOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value
    handleButtonClick(inputValue, 'carModel')
  }

  return (
    <div className="car-modal-step" data-testid="car-model-step">
      <Form orientation="row">
        {carModels.cars.map(({ id, name }) => (
          <FormInput
            inputName="car-model"
            key={id}
            id={`car-model-input-${id}`}
            inputType="radio"
            handleButtonClick={handleOnClick}
            inputValue={name}
            labelValue={name}
            additionalStyle=""
          />
        ))}
      </Form>
    </div>
  )
}

export default CarModelStep
