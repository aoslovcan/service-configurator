import React from 'react'
import Table from '../../../common/Table/Table'
import { carServices, TableOptions, User } from '../../../types/types'
import InfoList from '../../../common/InfoList/InfoList'
import StepReview from './StepReview/StepReview'

type SummaryStepProps = {
  carModel: string
  services: carServices
  userData: User
  totalPrice: number
}

const SummaryStep = ({
  carModel,
  services,
  totalPrice,
  userData,
}: SummaryStepProps) => {
  const servicesData: any = services.map(({ name, price }) => {
    return {
      title: name,
      value: price,
      cellClass: 'moveRight',
    }
  })

  const pricesData = services.map(({ price }) => price)

  const tableData: TableOptions[] = [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...servicesData,

    {
      title: '',
      value: (
        <>
          <span className="text-color-grey-200">Popust30%:</span> -37,50 €
        </>
      ),
      cellClass: 'moveRight',
    },
    {
      title: '',
      value: (
        <>
          <span className="text-color-grey-200">Ukupno:</span>{' '}
          <span className="total">{totalPrice} €</span>
        </>
      ),
      cellClass: 'moveRight',
    },
  ]

  const userInfoList = [
    {
      label: 'Ime i prezime',
      value: userData.nameAndSurname,
    },
    {
      label: 'Email adresa',
      value: userData.emailAddress,
    },
    {
      label: 'Broj telefona',
      value: userData.phoneNumber,
    },
    {
      label: 'Napomena',
      value: userData.note,
    },
  ]

  return (
    <>
      <p className="paragraph">
        Molimo vas da još jednom pregledate i potvrdite podatke. Ukoliko želite
        promijeniti neki od podataka, možete pritisnuti gumb za uređivanje pored
        svake od kategorija. Kada ste provjerili ispravnost svojih podataka, za
        slanje upita na servis pritisnite gumb “Pošalji” koji se nalazi na dnu.
      </p>

      <StepReview title="Model vozila">
        <div className="item">{carModel}</div>
      </StepReview>

      <StepReview title="Odabrane usluge">
        <Table id="config-table" tableData={tableData} />
      </StepReview>

      <StepReview title="Kontakt podaci">
        <InfoList listData={userInfoList} />
      </StepReview>
    </>
  )
}

export default SummaryStep
