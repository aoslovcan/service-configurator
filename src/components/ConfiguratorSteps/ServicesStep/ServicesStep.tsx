import React, { useState } from 'react'
import Form from '../../../common/Form/Form'
import services from '../../../data/services.json'
import FormInput from '../../../common/Form/FormInput'

type CarModeStepProps = {
  handleButtonClick: (data: string) => void
}

const ServicesStep = ({ handleButtonClick }: CarModeStepProps) => {
  const [total, setTotal] = useState(0)

  const getPriceFromString = (value: string) => {
    const splitValue = value.split('-')[1]

    return Number(splitValue.slice(0, -1))
  }
  const handleOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const isChecked = target.checked
    const inputValue = target.value
    const checkedPrice: number = getPriceFromString(inputValue)

    isChecked ? setTotal(total + checkedPrice) : setTotal(total - checkedPrice)

    handleButtonClick(inputValue)
  }

  return (
    <div className="services-step" data-testid="services-step">
      <Form orientation="row">
        {services.services.map(({ id, name, price }) => (
          <FormInput
            key={id}
            id={`service-model-input-${id}`}
            inputType="checkbox"
            handleButtonClick={handleOnClick}
            inputValue={`${name}-${price}`}
            labelValue={
              <>
                {name} <span className="total">({price})</span>
              </>
            }
            classNames="checkmark"
            additionalStyle="form-group-bigger-element"
          />
        ))}
      </Form>
      <div className="total-footer row">
        <span>imam kupon</span>
        <span>
          Ukupno: <span className="total">${total}€</span>
        </span>
      </div>
    </div>
  )
}

export default ServicesStep
