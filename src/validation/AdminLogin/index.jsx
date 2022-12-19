import * as Yup from 'yup';
import { PASSWORD_REG_EXP } from '../../constant'
import i18n from '../../translation'

export const schemaValidate = Yup.object().shape({
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
});
