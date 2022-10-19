import * as Yup from 'yup';
import { PASSWORD_REG_EXP } from '../../constant'

export const schemaValidate = Yup.object().shape({
  code: Yup.string()
    .required('Vui lòng nhập mã xác nhận!'),
  password: Yup.string()
    .required('Vui lòng nhập mật khẩu của bạn!')
    .min(
      8,
      'Mật khẩu phải có ít nhất 8 ký tự!',
    )
    .max(
      50,
      'Mật khẩu chỉ có tối đa 50 ký tự!',
    )
    .matches(
      PASSWORD_REG_EXP,
      'Mật khẩu bao gồm các ký tự chữ và số!',
    ),
  rePassword: Yup.string()
    .required('Vui lòng nhập lại mật khẩu!'),
});