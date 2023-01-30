import React, {
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import ConfirmationStep from '../../components/ConfiguratorSteps/ConfirmationStep/ConfirmationStep'

type ConfiguratorModalProps = {
  id: string
  onClose: MouseEventHandler
  nextButtonEnabled?: boolean
  children: ReactNode
  title: string
  handleCurrentStep: SetStateAction<any>
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
  const [numberOfSteps, setNumberOfSteps] = useState<number | undefined>(0)
  const [finishedSteps, setFinishedSteps] = useState([
    ...Array.from(Array(currentStep).keys()),
  ])

  const stepChildren = React.Children.map(children, (child, index) =>
    // @ts-ignore
    React.cloneElement(child, {
      // @ts-ignore
      ...child.props,
      hidden: index !== currentStep,
    })
  )

  useEffect(() => {
    setNumberOfSteps(stepChildren?.length)
  }, [stepChildren])

  const goToNextStep = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement
    const buttonText = target.innerText

    if (buttonText === 'Dalje') {
      setCurrentStep(currentStep + 1)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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

  useEffect(() => {
    handleCurrentStep(currentStep)
  }, [currentStep])

  // @ts-ignore
  // @ts-ignore
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
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                stepChildren?.length - 1 - currentStep === 0
                  ? 'Pošalji'
                  : 'Dalje'
              }
            </button>
          </div>
        ) : (
          <div className="modal__footer column column-center">
            <button onClick={onClose} className="c-button c-button-primary">
              Zatvori
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConfiguratorModal
