import * as Yup from 'yup'
import i18n from '../../translation'

export const schemaValidate = Yup.object().shape({
  categoryName: Yup.string()
    .trim()
    .required(i18n.t('validation.categoryNameRequired')),
  description: Yup.string()
    .trim()
    .required(i18n.t('validation.categoryDescriptionRequired')),
  image: Yup.mixed()
    .required(i18n.t('validation.imageRequired')),
})
