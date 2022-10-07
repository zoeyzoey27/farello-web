import * as Yup from 'yup'

export const schemaValidate = Yup.object().shape({
  name: Yup.string()
    .required('Vui lòng nhập tên sản phẩm!'),
  categoryId: Yup.string()
    .required('Vui lòng chọn danh mục sản phẩm!'),
  priceIn: Yup.number()
    .typeError('Giá nhập không hợp lệ!')
    .positive('Giá nhập không hợp lệ!')
    .integer('Giá nhập không hợp lệ!'),
  priceOut: Yup.number()
    .typeError('Giá bán không hợp lệ!')
    .positive('Giá bán không hợp lệ!')
    .integer('Giá bán không hợp lệ!')
    .required('Vui lòng nhập giá bán!'),
  priceSale: Yup.number()
    .typeError('Giá khuyến mại không hợp lệ!')
    .positive('Giá khuyến mại không hợp lệ!')
    .integer('Giá khuyến mại không hợp lệ!'),
  quantity: Yup.number()
    .typeError('Giá khuyến mại không hợp lệ!')
    .positive('Giá khuyến mại không hợp lệ!')
    .integer('Giá khuyến mại không hợp lệ!')
    .required('Vui lòng nhập số lượng sản phẩm!'),
  images: Yup.mixed()
    .required('Vui lòng tải lên ảnh minh họa!'),
})
