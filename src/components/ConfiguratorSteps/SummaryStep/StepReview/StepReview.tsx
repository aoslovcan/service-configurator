import React, { ReactNode } from 'react'

type StepReview = {
  title: string
  children: ReactNode
}

const StepReview = ({ title, children }: StepReview) => {
  return (
    <div className="step-review">
      <div className="column">
        <div className="step-review__content row">
          <h4>{title}</h4>
          <button className="c-button c-button-withPencilIcon">
            Uredi <span className="pencil-icon" />
          </button>
        </div>
        <div className="step-review__content row">{children}</div>
      </div>
    </div>
  )
}

export default StepReview
