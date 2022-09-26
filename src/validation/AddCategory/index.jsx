import * as Yup from 'yup'

export const schemaValidate = Yup.object().shape({
  categoryName: Yup.string()
    .required('Vui lòng nhập tên danh mục sản phẩm!'),
  description: Yup.string()
    .required('Vui lòng nhập mô tả chi tiết danh mục sản phẩm!'),
  image: Yup.mixed()
    .required('Vui lòng tải lên ảnh minh họa!'),
})
