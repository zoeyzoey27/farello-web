import * as Yup from 'yup'
import i18n from '../../translation'

export const schemaValidate = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required(i18n.t('validation.titlePostRequired')),
  categoryName: Yup.string()
    .trim()
    .required(i18n.t('validation.postCategoryRequired')),
  content: Yup.string()
    .trim()
    .required(i18n.t('validation.postCategoryRequired')),
  image: Yup.mixed()
    .required(i18n.t('validation.imageRequired')),
})