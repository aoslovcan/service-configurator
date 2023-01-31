import React, { MouseEventHandler, ReactNode, useEffect, useState } from 'react'
import ConfirmationStep from '../../components/ConfiguratorSteps/ConfirmationStep/ConfirmationStep'
import { configuratorButtonNames } from '../../constants/Constants'

type ConfiguratorModalProps = {
  id: string
  onClose: MouseEventHandler
  nextButtonEnabled?: boolean
  children: ReactNode
  title: string
  handleCurrentStep: (value: number) => void
}

const ConfiguratorModal = ({
  id,
  onClose,
  nextButtonEnabled = false,
  title,
  children,
  handleCurrentStep,
}: ConfiguratorModalProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false)
  const [finishedSteps, setFinishedSteps] = useState([
    ...Array.from(Array(currentStep).keys()),
  ])

  const stepChildren = React.Children.map(children, (child: any, index) =>
    React.cloneElement(child, {
      ...child.props,
      hidden: index !== currentStep,
    })
  )

  const goToNextStep = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement
    const buttonText = target.innerText

    if (buttonText === configuratorButtonNames.NEXT_BUTTON) {
      setCurrentStep(currentStep + 1)
      setFinishedSteps([...new Set([...finishedSteps, currentStep])])
      return
    }

    setShowConfirmationMessage(true)
  }

  const goToPreviousStep = () => {
    if (currentStep >= 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isLastStep: boolean = stepChildren?.length - 1 - currentStep === 0
  const showPreviousButton = currentStep >= 1

  useEffect(() => {
    handleCurrentStep(currentStep)
  }, [currentStep])

  return (
    <div id={id} className="c-modal-container">
      <div className="modal">
        <div className="modal__header row">
          <h2 className="title title-xl">{title}</h2>
          <span onClick={onClose} className="closeButton">
            x
          </span>
        </div>
        <div className="modalBody">
          {
            <div className="step">
              {showConfirmationMessage ? <ConfirmationStep /> : stepChildren}
            </div>
          }
        </div>

        {!showConfirmationMessage ? (
          <div className="modal__footer row">
            {showPreviousButton ? (
              <button
                onClick={goToPreviousStep}
                className="c-button c-button-secondary"
              >
                {configuratorButtonNames.PREVIOUS_BUTTON}
              </button>
            ) : (
              <button onClick={onClose} className="c-button c-button-secondary">
                {configuratorButtonNames.CANCEL_BUTTON}
              </button>
            )}

            <button
              onClick={goToNextStep}
              className={`c-button ${
                nextButtonEnabled ? 'c-button-primary' : 'c-button-disabled'
              }`}
            >
              {isLastStep
                ? configuratorButtonNames.SENT_BUTTON
                : configuratorButtonNames.NEXT_BUTTON}
            </button>
          </div>
        ) : (
          <div className="modal__footer column column-center">
            <button onClick={onClose} className="c-button c-button-primary">
              {configuratorButtonNames.CLOSE_BUTTON}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConfiguratorModal
