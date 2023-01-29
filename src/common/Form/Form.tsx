import React, { ReactNode } from 'react'

type FormProps = {
  orientation: string
  children: ReactNode
}

const Form = ({ orientation, children }: FormProps) => {
  const classes = `form-data ${orientation ? orientation : ''}`

  return <form className={classes}>{children}</form>
}

export default Form
