import React, { MouseEventHandler, ReactNode, useState } from 'react'

type ConfiguratorModalProps = {
  id: string
  onClose: MouseEventHandler
  nextButtonEnabled?: boolean
  children: ReactNode
}

const ConfiguratorModal = ({
  id,
  onClose,
  nextButtonEnabled = false,
  children,
}: ConfiguratorModalProps) => {
  const [currentStep, setCurrentStep] = useState(0)

  // @ts-ignore

  const stepChildren = React.Children.map(children, (child, index) =>
    // @ts-ignore
    React.cloneElement(child, {
      // @ts-ignore
      ...child.props,
      hidden: index !== currentStep,
    })
  )

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const goToPreviousStep = () => {
    if (currentStep >= 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // @ts-ignore
  return (
    <div id={id} className="c-modal-container">
      <div className="modal">
        <div className="modal__header row">
          <h2 className="title title-xl">Konfigurator Servisa</h2>
          <span onClick={onClose} className="closeButton">
            x
          </span>
        </div>
        <div className="modalBody">
          {<div className="step">{stepChildren}</div>}
        </div>
        <div className="modal__footer row">
          {currentStep >= 1 ? (
            <button
              onClick={goToPreviousStep}
              className="c-button c-button-secondary"
            >
              Nazad
            </button>
          ) : (
            <button onClick={onClose} className="c-button c-button-secondary">
              Odustani
            </button>
          )}

          <button
            onClick={goToNextStep}
            className={`c-button ${
              nextButtonEnabled ? 'c-button-primary' : 'c-button-disabled'
            }`}
          >
            Dalje
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfiguratorModal
