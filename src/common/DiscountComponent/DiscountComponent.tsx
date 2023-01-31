import React, { SetStateAction, useState, useEffect } from 'react'
import { useFocus } from '../../helpers/customHooks'

type DiscountComponent = {
  label: string
  price: number
  setPrice: SetStateAction<any>
  discount: SetStateAction<any>
}

const DiscountComponent = ({
  label,
  price,
  setPrice,
  discount,
}: DiscountComponent) => {
  const discountCode = 'Tokić123'
  const errorMessage = 'Pogrešan kupon'
  const [discountCorrect, setDiscountCorrect] = useState(false)
  const [messageShow, setMessageShow] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const focusElement = useFocus()

  const discountPrice = (price: number) => {
    return (price / 100) * 30
  }

  useEffect(() => {
    if (discountCorrect) {
      setPrice(discountPrice(price))
      discount(price - discountPrice(price))
    }
  }, [discountCorrect])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const inputValue = target.value
    setDiscountCorrect(inputValue.trim() === discountCode.trim())
    setMessageShow(inputValue.trim() !== discountCode.trim())
  }

  const openDiscount = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="discount-component">
      <span
        tabIndex={0}
        role="button"
        onClick={openDiscount}
        className="discountLabel total"
      >
        {label}
      </span>

      {isOpen ? (
        <div className="form-element">
          <div className="row">
            <input
              ref={focusElement}
              type="text"
              onChange={(e) => handleInput(e)}
            />
            <span>{!discountCorrect && messageShow ? errorMessage : null}</span>
            {discountCorrect ? <span>&#10003;</span> : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default DiscountComponent
