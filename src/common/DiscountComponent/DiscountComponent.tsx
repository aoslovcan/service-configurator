import React, { useState, useEffect } from 'react'
import { useFocus, useForm } from '../../helpers/customHooks'
import checkMark from '../../static/icons/checkmark.svg'

type StateAction = (value: number) => void

type DiscountComponent = {
  label: string
  price: number
  setPrice: StateAction
  discount: StateAction
}

const DiscountComponent = ({
  label,
  price,
  setPrice,
  discount,
}: DiscountComponent) => {
  const discountCode = 'Tokić123'
  const [discountCorrect, setDiscountCorrect] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const focusElement = useFocus()

  const initialForm: Record<string, unknown> = {
    discountValue: 0,
  }

  const validations = {
    discountValue: {
      required: {
        value: true,
        message: '',
      },
      custom: {
        isValid: ({ discountValue }: { discountValue: string }) =>
          discountValue === discountCode,
        message: 'Pokrešan kod',
      },
    },
  }

  const { handleChange, formErrors } = useForm(
    initialForm,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    validations
  )

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

    handleChange('discountValue')({
      target: {
        value: inputValue,
      },
    })

    setDiscountCorrect(inputValue.trim() === discountCode.trim())
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
              className="discountInput"
              ref={focusElement}
              type="text"
              onChange={(e) => handleInput(e)}
            />

            <span className="validation-msg">
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                formErrors && formErrors['discountValue']
              }
            </span>
            {discountCorrect ? (
              <button className="c-button c-button-primary discountCheckButton">
                <img src={checkMark} alt="" />
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default DiscountComponent
