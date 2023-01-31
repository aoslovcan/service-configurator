import React from 'react'
import envelope from '../../../static/icons/envelope.svg'
import { confirmationStep } from '../../../constants/Constants'

const ConfirmationStep = () => {
  return (
    <div className="column column-center">
      <img src={envelope} alt="" />
      <h3>{confirmationStep.TITLE}</h3>
      <p className="paragraph row textCenter">{confirmationStep.MESSAGE}</p>
    </div>
  )
}

export default ConfirmationStep
