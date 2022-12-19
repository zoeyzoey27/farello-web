import * as Yup from 'yup'
import i18n from '../../translation'

export const schemaValidate = Yup.object().shape({
  categoryName: Yup.string()
    .trim()
    .required(i18n.t('validation.postCategoryName')),
})
