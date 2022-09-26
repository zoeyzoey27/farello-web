import * as Yup from 'yup';
import { PASSWORD_REG_EXP, PHONE_REG_EXP } from '../../constant'

export const schemaValidate = Yup.object().shape({
  fullName: Yup.string()
    .required('Vui lòng nhập họ tên!'),
  email: Yup.string()
    .email('Địa chỉ email không hợp lệ!')
    .required('Vui lòng nhập địa chỉ email!'),
  password: Yup.string()
    .required('Vui lòng nhập mật khẩu!')
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
  phone: Yup.string()
    .required('Vui lòng nhập số điện thoại!')
    .matches(PHONE_REG_EXP, 'Số điện thoại không hợp lệ!')
    .length(10, 'Số điện thoại phải có 10 số!'),
  province: Yup.string()
    .required('Vui lòng nhập tỉnh/thành phố!'),
  district: Yup.string()
    .required('Vui lòng nhập quận/huyện!'),
  commune: Yup.string()
    .required('Vui lòng nhập xã/phường!'),
})