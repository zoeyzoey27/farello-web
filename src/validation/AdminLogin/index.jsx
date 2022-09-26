import * as Yup from 'yup';
import { PASSWORD_REG_EXP } from '../../constant'

export const schemaValidate = Yup.object().shape({
  email: Yup.string()
    .email('Địa chỉ email không hợp lệ!')
    .required('Vui lòng nhập địa chỉ email của bạn!'),
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
});
