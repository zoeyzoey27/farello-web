import * as Yup from 'yup'

export const schemaValidate = Yup.object().shape({
  priceIn: Yup.number()
    .typeError('Giá nhập không hợp lệ!')
    .integer('Giá nhập không hợp lệ!'),
  priceOut: Yup.number()
    .typeError('Giá bán không hợp lệ!')
    .integer('Giá bán không hợp lệ!'),
  priceSale: Yup.number()
    .typeError('Giá khuyến mại không hợp lệ!')
    .integer('Giá khuyến không hợp lệ!'),
  quantity: Yup.number()
    .typeError('Số lượng sản phẩm không hợp lệ!')
    .integer('Số lượng sản phẩm không hợp lệ!')
    .positive('Số lượng sản phẩm không hợp lệ!')
})