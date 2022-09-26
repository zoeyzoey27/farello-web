import * as Yup from 'yup'

export const schemaValidate = Yup.object().shape({
  name: Yup.string()
    .required('Vui lòng nhập tên sản phẩm!'),
  priceOrigin: Yup.number('Giá nhập không hợp lệ!'),
  price: Yup.number('Giá bán không hợp lệ!')
    .required('Vui lòng nhập giá bán!'),
  priceSale: Yup.number('Giá khuyến mại không hợp lệ!'),
  quantity: Yup.number('Số lượng không hợp lệ!')
    .required('Vui lòng nhập số lượng sản phẩm!'),
  imageMain: Yup.mixed()
    .required('Vui lòng tải lên ảnh minh họa!'),
})
