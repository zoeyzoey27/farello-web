import * as Yup from 'yup';
import { PHONE_REG_EXP } from '../../constant'

export const schemaValidate = Yup.object().shape({
  fullName: Yup.string()
    .required('Vui lòng nhập họ tên!'),
  email: Yup.string()
    .email('Địa chỉ email không hợp lệ!')
    .required('Vui lòng nhập địa chỉ email của bạn!'),
  phoneNumber: Yup.string()
    .required('Vui lòng nhập số điện thoại!')
    .matches(PHONE_REG_EXP, 'Số điện thoại không hợp lệ!')
    .length(10, 'Số điện thoại phải có 10 số!'),
  content: Yup.string()
    .required('Vui lòng nhập họ tên!'),
});