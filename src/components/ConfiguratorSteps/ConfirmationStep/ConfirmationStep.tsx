import React from 'react'
import envelope from '../../../static/icons/envelope.svg'

const ConfirmationStep = () => {
  return (
    <div className="column column-center">
      <img src={envelope} />
      <h3>Vaša prijava je uspješno poslana</h3>
      <p>
        Vaša prijava je uspješno poslana i zaprimljena. Kontaktirat ćemo vas u
        najkraćem mogućem roku. Hvala vam!
      </p>
    </div>
  )
}

export default ConfirmationStep
