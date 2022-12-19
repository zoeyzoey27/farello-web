import * as Yup from 'yup';
import { PHONE_REG_EXP } from '../../constant'
import i18n from '../../translation'

export const schemaValidate = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .required(i18n.t('validation.nameRequired')),
  email: Yup.string()
    .trim()
    .email(i18n.t('validation.emailIncorrect'))
    .required(i18n.t('validation.emailRequired')),
  phoneNumber: Yup.string()
    .trim()
    .required(i18n.t('validation.phoneRequired'))
    .matches(PHONE_REG_EXP, i18n.t('validation.phoneIncorrect'))
    .length(10, i18n.t('validation.phoneFormat')),
  content: Yup.string()
    .trim()
    .required(i18n.t('validation.contentInquiry')),
});