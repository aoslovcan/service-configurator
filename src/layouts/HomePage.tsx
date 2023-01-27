import React, { useState } from 'react'
import cars from '../data/carBrand.json'
import services from '../data/services.json'
import ConfiguratorModal from '../components/ConfiguratorModal/ConfiguratorModal'
import ConfiguratorStep from '../components/ConfiguratorModal/ConfiguratorStep'
import Table from '../components/Table/Table'

const HomePage = () => {
  const [configuratorModalId, setConfiguratorModalId] = useState('')

  console.log(cars.cars)

  const openConfigurator = () => {
    setConfiguratorModalId('')
    setConfiguratorModalId('configuration-modal')
  }

  return (
    <>
      <h1>Hello world</h1>
      <button onClick={openConfigurator} className="c-button c-button-primary">
        Pokreni konfigurator
      </button>
      <button className="c-button c-button-disabled">Dalje</button>
      <button className="c-button c-button-secondary">Odustani</button>
      <div className="form-element">
        <div className="column">
          <label>Ime i prezime</label>
          <input type="text" />
        </div>
      </div>

      <div className="form-element">
        <div className="column">
          <label>Ime i prezime</label>
          <textarea />
        </div>
      </div>

      <button className="c-button c-button-withPencilIcon">
        Uredi <span className="pencil-icon" />
      </button>

      <div className="step-review">
        <div className="column">
          <div className="step-review__content row">
            <h4>Model vozila</h4>
            <button className="c-button c-button-withPencilIcon">
              Uredi <span className="pencil-icon" />
            </button>
          </div>
          <div className="step-review__content row">
            <div className="item">Zamjena ulja i filtera</div>
          </div>
        </div>
      </div>

      <div className="step-review">
        <div className="step-review__header row">
          <h4>Model vozila</h4>
          <button className="c-button c-button-withPencilIcon">
            Uredi <span className="pencil-icon" />
          </button>
        </div>
        <div className="step-review__content row">
          <Table id="config-table" />
        </div>
      </div>

      <div className="step-review">
        <div className="step-review__header row">
          <h4>Kontakt podaci</h4>
          <button className="c-button c-button-withPencilIcon">
            Uredi <span className="pencil-icon" />
          </button>
        </div>
        <div className="c-info-list">
          <div className="row">
            <span className="c-info-list__title">Ime i prezime:</span>
            <span className="moveRight">John Doe</span>
          </div>
          <div className="row">
            <span className="c-info-list__title">Email adresa:</span>
            <span className="moveRight">john.doe@mail.com</span>
          </div>
          <div className="row">
            <span className="c-info-list__title">Broj telefona:</span>
            <span className="moveRight">091 123 4567</span>
          </div>
          <div className="row">
            <span className="c-info-list__title">Napomena:</span>
            <span className="moveLeft">
              Kod auta se prilikom prelaska preko rupa čuje lupanje pa bi i to
              trebalo pogledati
            </span>
          </div>
        </div>
      </div>

      <p className="paragraph">
        Molimo vas da još jednom pregledate i potvrdite podatke. Ukoliko želite
        promijeniti neki od podataka, možete pritisnuti gumb za uređivanje pored
        svake od kategorija. Kada ste provjerili ispravnost svojih podataka, za
        slanje upita na servis pritisnite gumb “Pošalji” koji se nalazi na dnu.
      </p>

      {configuratorModalId ? (
        <ConfiguratorModal
          id={configuratorModalId}
          onClose={() => setConfiguratorModalId('')}
          nextButtonEnabled={true}
        >
          <ConfiguratorStep
            stepTitle="Odaberite proizvođaća vašeg vozila"
            className="step"
            hidden={false}
            stepNumber={1}
          >
            <form className="form-data row">
              {
                // @ts-ignore
                cars.cars.map(({ name }) => (
                  <div className="form-group">
                    <input
                      type="radio"
                      id="html"
                      name="fav_language"
                      value={name}
                    />
                    <label htmlFor="html">{name}</label>
                  </div>
                ))
              }
            </form>
          </ConfiguratorStep>
          <ConfiguratorStep
            stepTitle="Odaberite proizvođaća vašeg vozila test"
            className="step"
            hidden={true}
            stepNumber={2}
          >
            <form className="form-data row">
              {
                // @ts-ignore
                services.services.map(({ name, price }) => (
                  <div className="form-group form-group-bigger-element">
                    <input
                      className="checkmark"
                      type="checkbox"
                      id="html"
                      name="fav_language"
                      value={name}
                    />
                    <label htmlFor="html">
                      {name} <span className="total">({price})</span>
                    </label>
                  </div>
                ))
              }
            </form>
          </ConfiguratorStep>
          <ConfiguratorStep
            stepTitle="Vaši podaci"
            className="step"
            hidden={true}
            stepNumber={3}
          >
            <form className="form-data column">
              <div className="form-element">
                <div className="column">
                  <label>Ime i prezime</label>
                  <input type="text" />
                </div>
              </div>
              <div className="form-element">
                <div className="column">
                  <label>Email adresa</label>
                  <input type="text" />
                </div>
              </div>
              <div className="form-element">
                <div className="column">
                  <label>Broj telefona</label>
                  <input type="text" />
                </div>
              </div>
              <div className="form-element">
                <div className="column">
                  <label>Napomena (opcionalno)</label>
                  <textarea />
                </div>
              </div>
            </form>
          </ConfiguratorStep>
        </ConfiguratorModal>
      ) : null}
    </>
  )
}

export default HomePage
