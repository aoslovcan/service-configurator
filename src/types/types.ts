export interface TableOptions {
  title: string
  value: JSX.Element | string
  cellClass: string | null
}

export interface User {
  nameAndSurname: string
  emailAddress: string
  phoneNumber: number
  note?: string
}

export type carService = {
  id: number
  name: string
  price: number
}

export type carServices = carService[]
export type servicePrice = { total: number; discountPrice: number }

export type formList = {
  id: number
  label: string
  type: string
  formDataLabel: string
}

export type fromLists = formList[]

export interface ValidationType {
  string:
    | {
        required?: {
          value: boolean
          message: string
        }
      }
    | undefined
}
