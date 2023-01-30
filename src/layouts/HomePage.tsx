import React, { useCallback, useState } from 'react'
import ConfiguratorModal from '../common/ConfiguratorModal/ConfiguratorModal'
import ConfiguratorStep from '../common/ConfiguratorModal/ConfiguratorStep'
import CarModelStep from '../components/ConfiguratorSteps/CarModelStep/CarModelStep'
import ServicesStep from '../components/ConfiguratorSteps/ServicesStep/ServicesStep'
import UserForm from '../components/ConfiguratorSteps/UserForm/UserForm'
import SummaryStep from '../components/ConfiguratorSteps/SummaryStep/SummaryStep'
import { User } from '../types/types'
import Navigation from '../components/Navigation/Navigation'
import tool from '../static/img/tool.jpg'

const HomePage = () => {
  const [configuratorModalId, setConfiguratorModalId] = useState('')
  const [carModel, setCarModel] = useState('')
  const [carServices, setCarServices] = useState([])
  const [userData, setUserData] = useState<User>({
    nameAndSurname: '',
    emailAddress: '',
    phoneNumber: 0,
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [formValid, setFormValid] = useState(false)

  const openConfigurator = () => {
    setConfiguratorModalId('')
    setConfiguratorModalId('configuration-modal')
  }

  const handleData = (data: any | User, name: string) => {
    const contextData: any = {
      carModel: {
        do: () => setCarModel(data),
      },
      carService: {
        do: () => setCarServices(data),
      },
      userData: {
        do: () => setUserData(data),
      },
    }
    contextData[name].do()
  }

  const isStepValid = useCallback(() => {
    let isValid
    switch (currentStep) {
      case 0:
        isValid = !!carModel
        break
      case 1:
        isValid = !!carServices.length
        break
      case 2:
        isValid = formValid
        break
      default:
        isValid = true
    }

    return isValid
  }, [carModel, carServices, formValid, currentStep])

  const resetForm = () => {
    setCarModel('')
    setCarServices([])
    setUserData({ nameAndSurname: '', emailAddress: '', phoneNumber: 0 })
  }

  const closeModal = () => {
    setConfiguratorModalId('')
    resetForm()
  }

  return (
    <div className="home-page">
      <Navigation />

      <div className="content column column-center">
        <img src={tool} alt="" />
        <p className="paragraph">Pritisnite gumb niže kako biste pokrenuli</p>
        <button
          onClick={openConfigurator}
          className="c-button c-button-primary"
        >
          Pokreni konfigurator
        </button>
      </div>

      {configuratorModalId ? (
        <ConfiguratorModal
          id={configuratorModalId}
          title="Konfigurator Servisa"
          onClose={closeModal}
          handleCurrentStep={(step: number) => setCurrentStep(step)}
          nextButtonEnabled={isStepValid()}
        >
          <ConfiguratorStep
            stepTitle="Odaberite proizvođaća vašeg vozila"
            className="step"
            hidden={false}
            stepNumber={1}
          >
            <CarModelStep handleButtonClick={handleData} />
          </ConfiguratorStep>
          <ConfiguratorStep
            stepTitle="Odaberite jednu ili više usluga koju trebate"
            className="step"
            hidden={true}
            stepNumber={2}
          >
            <ServicesStep
              handleButtonClick={handleData}
              handleTotalPrice={setTotalPrice}
            />
          </ConfiguratorStep>
          <ConfiguratorStep
            stepTitle="Vaši podaci"
            className="step"
            hidden={true}
            stepNumber={3}
          >
            <UserForm handleFormData={handleData} formValid={setFormValid} />
          </ConfiguratorStep>
          <ConfiguratorStep
            stepTitle="Pregled i potvrda vašeg odabira"
            className="step"
            hidden={true}
            stepNumber={4}
          >
            <SummaryStep
              carModel={carModel}
              services={carServices}
              totalPrice={totalPrice}
              userData={userData}
            />
          </ConfiguratorStep>
        </ConfiguratorModal>
      ) : null}
    </div>
  )
}

export default HomePage
