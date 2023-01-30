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
