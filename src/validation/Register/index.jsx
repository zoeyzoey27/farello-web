import * as Yup from 'yup';
import { PASSWORD_REG_EXP, PHONE_REG_EXP } from '../../constant'
import i18n from '../../translation'

export const schemaValidate = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required(i18n.t('validation.nameRequired')),
  email: Yup.string()
    .trim()
    .email(i18n.t('validation.emailIncorrect'))
    .required(i18n.t('validation.emailRequired')),
  password: Yup.string()
    .trim()
    .required(i18n.t('validation.passwordRequired'))
    .min(
      8,
      i18n.t('validation.passwordMin'),
    )
    .max(
      50,
      i18n.t('validation.passwordMax'),
    )
    .matches(
      PASSWORD_REG_EXP,
      i18n.t('validation.passwordFormat'),
    ),
  rePassword: Yup.string()
    .trim()
    .required(i18n.t('validation.rePasswordRequired')),
  phone: Yup.string()
    .trim()
    .required(i18n.t('validation.phoneRequired'))
    .matches(PHONE_REG_EXP, i18n.t('validation.phoneIncorrect'))
    .length(10, i18n.t('validation.phoneFormat')),
  province: Yup.string()
    .trim()
    .required(i18n.t('validation.provinceRequired')),
  district: Yup.string()
    .trim()
    .required(i18n.t('validation.districtRequired')),
  commune: Yup.string()
    .trim()
    .required(i18n.t('validation.communeRequired')),
  idcard: Yup.string()
    .nullable()
    .matches(PHONE_REG_EXP, i18n.t('validation.idCardIncorrect'))
    .min(
      9,
      i18n.t('validation.idCardMin'),
    )
    .max(
      12,
      i18n.t('validation.idCardMax'),
    )
})