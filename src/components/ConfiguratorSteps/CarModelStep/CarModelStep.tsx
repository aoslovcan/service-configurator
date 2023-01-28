import React from 'react'
import Form from '../../../common/Form/Form'
import carModels from '../../../data/carBrand.json'
import FormInput from '../../../common/Form/FormInput'

type CarModeStepProps = {
  handleButtonClick: (data: string) => void
}

const CarModelStep = ({ handleButtonClick }: CarModeStepProps) => {
  const handleOnClick = (e: string) => {
    handleButtonClick(e)
  }

  return (
    <div className="car-modal-step" data-testid="car-model-step">
      <Form orientation="row">
        {carModels.cars.map(({ id, name }) => (
          <FormInput
            key={id}
            id={`car-model-input-${id}`}
            inputType="radio"
            handleButtonClick={(e) => handleOnClick(e)}
            inputValue={name}
          />
        ))}
      </Form>
    </div>
  )
}

export default CarModelStep
