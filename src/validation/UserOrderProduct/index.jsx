import * as Yup from 'yup';
import { PHONE_REG_EXP } from '../../constant'

export const schemaValidate = Yup.object().shape({
  name: Yup.string()
    .required('Vui lòng nhập họ tên!'),
  email: Yup.string()
    .email('Địa chỉ email không hợp lệ!')
    .required('Vui lòng nhập địa chỉ email!'),
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
  address: Yup.string()
    .required('Vui lòng nhập địa chỉ cu thể!'),
})