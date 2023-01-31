import React from 'react'
import Table from '../../../common/Table/Table'
import { carServices, TableOptions, User } from '../../../types/types'
import InfoList from '../../../common/InfoList/InfoList'
import StepReview from './StepReview/StepReview'
import { summaryStepConst } from '../../../constants/Constants'

type SummaryStepProps = {
  carModel: string
  services: carServices
  userData: User
  totalPrice: { total: number; discountPrice: number }
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

  const tableData: TableOptions[] = [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...servicesData,

    {
      title: '',
      value: (
        <>
          {totalPrice.discountPrice > 0 ? (
            <span>
              <span className="text-color-grey-200">Popust30%:</span> -
              {totalPrice.discountPrice} €
            </span>
          ) : null}
        </>
      ),
      cellClass: 'moveRight',
    },
    {
      title: '',
      value: (
        <>
          <span className="text-color-grey-200">Ukupno:</span>{' '}
          <span className="total">{totalPrice.total} €</span>
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
      <p className="paragraph">{summaryStepConst.MESSAGE}</p>

      <StepReview title={summaryStepConst.CAR_MODEL}>
        <div className="item">{carModel}</div>
      </StepReview>

      <StepReview title={summaryStepConst.SERVICES}>
        <Table id="config-table" tableData={tableData} />
      </StepReview>

      <StepReview title={summaryStepConst.USER_INFO}>
        <InfoList listData={userInfoList} />
      </StepReview>
    </>
  )
}

export default SummaryStep
