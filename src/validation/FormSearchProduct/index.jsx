import * as Yup from 'yup'
import i18n from '../../translation'

export const schemaValidate = Yup.object().shape({
  priceIn: Yup.number()
    .trim()
    .typeError(i18n.t('validation.priceInIncorrect'))
    .integer(i18n.t('validation.priceInIncorrect')),
  priceOut: Yup.number()
    .trim()
    .typeError(i18n.t('validation.priceOutIncorrect'))
    .integer(i18n.t('validation.priceOutIncorrect')),
  priceSale: Yup.number()
    .trim()
    .typeError(i18n.t('validation.priceSaleIncorrect'))
    .integer(i18n.t('validation.priceSaleIncorrect')),
  quantity: Yup.number()
    .trim()
    .typeError(i18n.t('validation.quantityIncorrect'))
    .integer(i18n.t('validation.quantityIncorrect'))
    .positive(i18n.t('validation.quantityIncorrect'))
})