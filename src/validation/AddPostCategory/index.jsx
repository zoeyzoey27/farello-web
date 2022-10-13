import * as Yup from 'yup'

export const schemaValidate = Yup.object().shape({
  categoryName: Yup.string()
    .required('Vui lòng nhập tên danh mục bài viết!'),
})
