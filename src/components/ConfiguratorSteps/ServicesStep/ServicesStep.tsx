import React, { SetStateAction, useEffect, useState } from 'react'
import Form from '../../../common/Form/Form'
import services from '../../../data/services.json'
import FormInput from '../../../common/Form/FormInput'
import DiscountComponent from '../../../common/DiscaountComponent/DiscountComponent'

type CarModeStepProps = {
  handleButtonClick: (data: string, name: string) => void
  handleTotalPrice: SetStateAction<any>
}

const ServicesStep = ({
  handleButtonClick,
  handleTotalPrice,
}: CarModeStepProps) => {
  const [total, setTotal] = useState(0)
  const [checked, setChecked] = useState<number[]>([])

  const getPriceFromString = (value: string) => {
    const splitValue = value.split('-')[1]

    return Number(splitValue.slice(0, -1))
  }

  const getServiceId = (value: string) => {
    return value.replace('service-model-input-', '')
  }

  const getServiceDataById = (id: number) => {
    return services.services.find((service) => service.id === Number(id))
  }

  useEffect(() => {
    let serviceItems: any = checked.map((id) => getServiceDataById(id))

    handleButtonClick(serviceItems, 'carService')
  }, [checked])

  useEffect(() => {
    handleTotalPrice(total)
  }, [total])

  const handleOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const isChecked = target.checked
    const inputValue = target.value
    const checkedPrice: number = getPriceFromString(inputValue)
    const serviceId = Number(getServiceId(target.id))

    let updatedList: number[] = [...checked]
    if (isChecked) {
      updatedList = [...checked, serviceId]
    } else {
      updatedList.splice(checked.indexOf(serviceId), 1)
    }

    setChecked(updatedList)

    isChecked ? setTotal(total + checkedPrice) : setTotal(total - checkedPrice)
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
        <DiscountComponent
          price={total}
          setPrice={(value: number) => setTotal(value)}
          label="imam kupon"
        />
        <span>
          Ukupno: <span className="total">${total}€</span>
        </span>
      </div>
    </div>
  )
}

export default ServicesStep
