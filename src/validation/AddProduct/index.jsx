import * as Yup from 'yup'
import i18n from '../../translation'

export const schemaValidate = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required(i18n.t('validation.productNameRequired')),
  categoryId: Yup.string()
    .trim()
    .required(i18n.t('validation.productCategoryRequired')),
  priceIn: Yup.number()
    .typeError(i18n.t('validation.priceInIncorrect'))
    .positive(i18n.t('validation.priceInIncorrect'))
    .integer(i18n.t('validation.priceInIncorrect')),
  priceOut: Yup.number()
    .typeError(i18n.t('validation.priceOutIncorrect'))
    .positive(i18n.t('validation.priceOutIncorrect'))
    .integer(i18n.t('validation.priceOutIncorrect'))
    .required(i18n.t('validation.priceOutRequired')),
  priceSale: Yup.number()
    .typeError(i18n.t('validation.priceSaleIncorrect'))
    .positive(i18n.t('validation.priceSaleIncorrect'))
    .integer(i18n.t('validation.priceSaleIncorrect')),
  quantity: Yup.number()
    .typeError(i18n.t('validation.quantityIncorrect'))
    .positive(i18n.t('validation.quantityIncorrect'))
    .integer(i18n.t('validation.quantityIncorrect'))
    .required(i18n.t('validation.quantityRequired')),
  images: Yup.mixed()
    .required(i18n.t('validation.imageRequired')),
})
