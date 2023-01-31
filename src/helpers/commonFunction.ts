export const checkValidation = (value: string, name: string) => {
  const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  const phoneNumberFormat =
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/

  const validationContext: any = {
    email: {
      check: mailFormat.test(value),
    },
    phoneNumber: {
      check: phoneNumberFormat.test(value),
    },
  }

  return validationContext[name].check
}
